import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/service/base.service';
import { Location } from './entities/location.entity';
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
import { FilteringLocationDto } from './dto/filtering-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class LocationsService extends BaseService<Location, CreateLocationDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(Location)
    protected readonly repository: Repository<Location>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {
      village: true,
    };
  }

  public async queryBuilder(
    query: FilteringLocationDto,
  ): Promise<FindManyOptions<Location>> {
    const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;

    const where: FindOptionsWhere<Location> = {
      ...(search && {
        name: ILike(`%${search}%`),
      }),
      ...(filters.villageCode && { village: { code: filters.villageCode } }),
    };

    const relations: FindOptionsRelations<Location> = {
      ...this.defaultRelation(),
    };

    const queryOptions: FindManyOptions<Location> = await super.buildQuery(
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
    data: CreateLocationDto | CreateLocationDto[],
    user?: JwtPayloadDto,
  ): Promise<Location | Location[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const transformedEntities = entities.map((entity) => ({
        ...entity,
        village: {
          code: entity.villageCode,
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
