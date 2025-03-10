import { Injectable } from '@nestjs/common';
import { CreateVillageDto } from './dto/create-village.dto';
import { BaseService } from '../../common/service/base.service';
import { Village } from './entities/village.entity';
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
import { FilteringVillageDto } from './dto/filtering-village.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class VillagesService extends BaseService<Village, CreateVillageDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(Village)
    protected readonly repository: Repository<Village>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {
      district: true,
    };
  }

  public async queryBuilder(
    query: FilteringVillageDto,
  ): Promise<FindManyOptions<Village>> {
    const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;

    const where: FindOptionsWhere<Village> = {
      ...(search && {
        name: ILike(`%${search}%`),
      }),
      ...(filters.regencyCode && { regency: { code: filters.regencyCode } }),
    };

    const relations: FindOptionsRelations<Village> = {
      ...this.defaultRelation(),
    };

    const queryOptions: FindManyOptions<Village> = await super.buildQuery(
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
    data: CreateVillageDto | CreateVillageDto[],
    user?: JwtPayloadDto,
  ): Promise<Village | Village[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const transformedEntities = entities.map((entity) => ({
        ...entity,
        district: entity.district,
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
