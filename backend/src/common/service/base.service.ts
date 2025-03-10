import {
  DataSource,
  DeepPartial,
  EntityNotFoundError,
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { BaseEntity } from '../entity/base.entity';
import { QueryParameterDto } from '../dto/query-parameter.dto';
import { ConflictException } from '../exception/types/conflict.exception';
import { NotFoundException } from '../exception/types/not-found.exception';

export abstract class BaseService<TEntity extends BaseEntity, TCreate> {
  constructor(
    protected dataSource: DataSource,
    protected entitiesRepository: Repository<TEntity>,
  ) {}

  async getQueryRunner(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  async transactions<T>(
    callback: (manager: QueryRunner['manager']) => Promise<T>,
  ): Promise<T> {
    const queryRunner = await this.getQueryRunner();

    try {
      const result = await callback(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async create(
    data: TCreate | TCreate[],
    user?: JwtPayloadDto,
  ): Promise<TEntity | TEntity[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const isExist = await Promise.all(
        entities.map((entity) => {
          return this.exist({
            where: {
              ...(entity as FindOptionsWhere<TEntity>),
            },
          });
        }),
      );

      if (isExist.some((exist) => exist)) {
        throw new ConflictException(
          `${this.entitiesRepository.metadata.name} Telah ada`,
        );
      }

      const repository = manager.getRepository(this.entitiesRepository.target);
      const createdEntities = entities.map((entity) => {
        return repository.create({
          ...entity,
          createdBy: user?.username,
        } as DeepPartial<TEntity>);
      });

      const savedEntities = await manager.save(createdEntities);

      return Array.isArray(data) ? savedEntities : savedEntities[0];
    }).catch((error) => {
      throw error;
    });
  }

  async update(
    id: number,
    data: Partial<TCreate>,
    user?: JwtPayloadDto,
  ): Promise<TEntity> {
    return this.transactions(async (manager) => {
      const repository = manager.getRepository(this.entitiesRepository.target);

      const query: FindOneOptions = {
        where: {
          id: id,
        },
      };

      const entity = await repository.findOne(query);

      if (!entity) {
        throw new NotFoundException(
          `${this.entitiesRepository.metadata.name} Tidak Ditemukan`,
        );
      }

      const updatedEntity = repository.create({
        ...entity,
        ...data,
        updatedBy: user?.username,
      });

      await manager.save(updatedEntity);

      return updatedEntity;
    }).catch((error) => {
      throw error;
    });
  }

  async buildQuery(
    whereQuery: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
    relationsQuery: FindOptionsRelations<TEntity>,
    paginationQuery?: QueryParameterDto,
  ): Promise<FindManyOptions<TEntity>> {
    const {
      limit = 10,
      page = 1,
      orderBy = ['id:DESC'],
    } = paginationQuery || {};

    const order: FindOptionsOrder<TEntity> = {};

    orderBy.forEach((item) => {
      const [field, direction] = item.split(':');
      if (field && direction) {
        (order as any)[field] = direction.toUpperCase() as 'ASC' | 'DESC';
      } else {
        (order as any)[field] = 'DESC';
      }
    });

    return {
      where: whereQuery,
      relations: relationsQuery,
      take: limit,
      skip: (page - 1) * limit,
      order: order,
    };
  }

  async findAndCount(
    options: FindManyOptions<TEntity> = {},
  ): Promise<[TEntity[], number]> {
    return this.entitiesRepository.findAndCount(options);
  }

  async findBy(options: FindManyOptions<TEntity>): Promise<TEntity[] | []> {
    const queryBuilder = await this.buildQuery(
      options.where || {},
      options.relations as FindOptionsRelations<TEntity>,
    );
    return this.entitiesRepository.find(queryBuilder);
  }

  async findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null> {
    return await this.entitiesRepository.findOne(options);
  }

  async exist(options: FindOneOptions<TEntity>): Promise<boolean> {
    return !!(await this.entitiesRepository.findOne(options));
  }

  async count(options: FindOneOptions<TEntity>): Promise<number> {
    return this.entitiesRepository.count(options);
  }

  async remove(
    option: FindOptionsWhere<TEntity>,
    user?: JwtPayloadDto,
  ): Promise<boolean> {
    try {
      const metadata = this.entitiesRepository.metadata;
      const relations = metadata.relations.map(
        (relation) => relation.propertyName,
      );

      if (option) {
        const entity = await this.entitiesRepository.findOneOrFail({
          where: option,
          relations: relations,
        } as any);

        entity.deletedBy = user?.username;

        await this.entitiesRepository.save(entity);
        return await this.entitiesRepository.softRemove(entity as any);
      }

      /* 
        Bulk Soft Delete
      */
      const entities = await this.entitiesRepository.find({ relations });
      for (const entity of entities) {
        (entity as any).deletedBy = user?.username;
        (entity as any).deletedAt = new Date();
        await this.entitiesRepository.save(entity);
      }
      return await this.entitiesRepository.softRemove(entities as any);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `${this.entitiesRepository.metadata.name} Tidak Ditemukan`,
        );
      }
      throw error;
    }
  }
}
