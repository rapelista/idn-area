import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { BaseService } from '../../common/service/base.service';
import { District } from './entities/district.entity';
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
import { FilteringDistrictDto } from './dto/filtering-district.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class DistrictsService extends BaseService<District, CreateDistrictDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(District)
    protected readonly repository: Repository<District>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {
      regency: true,
    };
  }

  public async buildQuery(
    query: FilteringDistrictDto,
  ): Promise<FindManyOptions<District>> {
    const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;

    const where: FindOptionsWhere<District> = {
      ...(search && {
        name: ILike(`%${search}%`),
      }),
      ...(filters.regencyCode && { regency: { code: filters.regencyCode } }),
    };

    const relations: FindOptionsRelations<District> = {
      ...this.defaultRelation(),
    };

    const queryOptions: FindManyOptions<District> = await super.buildQuery(
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
    data: CreateDistrictDto | CreateDistrictDto[],
    user?: JwtPayloadDto,
  ): Promise<District | District[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const transformedEntities = entities.map((entity) => ({
        ...entity,
        regency: entity.regency,
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
