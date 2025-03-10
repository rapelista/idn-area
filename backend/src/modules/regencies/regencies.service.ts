import { Injectable } from '@nestjs/common';
import { CreateRegencyDto } from './dto/create-regency.dto';
import { BaseService } from '../../common/service/base.service';
import { Regency } from './entities/regency.entity';
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
import { FilteringRegencyDto } from './dto/filtering-regency.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class RegenciesService extends BaseService<Regency, CreateRegencyDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(Regency)
    protected readonly repository: Repository<Regency>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {
      province: true,
    };
  }

  public async buildQuery(
    query: FilteringRegencyDto,
  ): Promise<FindManyOptions<Regency>> {
    const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;

    const where: FindOptionsWhere<Regency> = {
      ...(search && {
        name: ILike(`%${search}%`),
      }),
      ...(filters.provinceCode && { province: { code: filters.provinceCode } }),
    };

    const relations: FindOptionsRelations<Regency> = {
      ...this.defaultRelation(),
    };

    const queryOptions: FindManyOptions<Regency> = await super.buildQuery(
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
    data: CreateRegencyDto | CreateRegencyDto[],
    user?: JwtPayloadDto,
  ): Promise<Regency | Regency[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const transformedEntities = entities.map((entity) => ({
        ...entity,
        province: entity.province,
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
