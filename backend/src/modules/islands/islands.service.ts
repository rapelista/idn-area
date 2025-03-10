import { Injectable } from '@nestjs/common';
import { CreateIslandDto } from './dto/create-island.dto';
import { BaseService } from '../../common/service/base.service';
import { Island } from './entities/island.entity';
import {
  DataSource,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilteringIslandDto } from './dto/filtering-island.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class IslandsService extends BaseService<Island, CreateIslandDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(Island)
    protected readonly repository: Repository<Island>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {};
  }

  public async buildQuery(
    query: FilteringIslandDto,
  ): Promise<FindManyOptions<Island>> {
    const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;

    const where: FindOptionsWhere<Island> = {
      ...(search && {
        name: ILike(`%${search}%`),
      }),
      ...(filters.regencyCode && { regency: { code: filters.regencyCode } }),
    };

    const relations: FindOptionsRelations<Island> = {
      ...this.defaultRelation(),
    };

    const queryOptions: FindManyOptions<Island> = await super.buildQuery(
      where,
      relations,
      {
        limit,
        page,
        orderBy: Array.isArray(orderBy) ? orderBy : [orderBy],
      },
    );

    return queryOptions;
  }

  async create(
    data: CreateIslandDto | CreateIslandDto[],
    user?: JwtPayloadDto,
  ): Promise<Island | Island[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const transformedEntities = entities.map((entity) => ({
        ...entity,
        regency: {
          code: entity.regencyCode,
        },
      }));

      const repository = manager.getRepository(this.repository.target);
      const createdEntities = transformedEntities.map((entity) => {
        return repository.create({
          ...entity,
          createdBy: user?.username,
        });
      });

      const savedEntities = await manager.save(createdEntities);

      const result = await manager.getRepository(this.repository.target).find({
        where: {
          id: In(savedEntities.map((entity) => entity.id)),
        },
        relations: this.defaultRelation(),
      });

      return Array.isArray(result) ? result[0] : result;
    });
  }
}
