import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { BaseService } from '../../common/service/base.service';
import { Province } from './entities/province.entity';
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
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
import { FilteringProvinceDto } from './dto/filtering-province.dto';

@Injectable()
export class ProvincesService extends BaseService<Province, CreateProvinceDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(Province)
    protected readonly repository: Repository<Province>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {};
  }

  public async queryBuilder(
    query: FilteringProvinceDto,
  ): Promise<FindManyOptions<Province>> {
    const { page, limit, orderBy = ['id:DESC'], search } = query;

    const where: FindOptionsWhere<Province> = {
      ...(search && {
        name: ILike(`%${search}%`),
      }),
    };

    const relations: FindOptionsRelations<Province> = {
      ...this.defaultRelation(),
    };

    const queryOptions: FindManyOptions<Province> = await super.buildQuery(
      where,
      relations,
      {
        limit,
        page,
        orderBy: Array.isArray(orderBy) ? orderBy : [orderBy],
      },
    );

    console.log('Di Provinces Service', queryOptions);

    return queryOptions;
  }

  async create(
    data: CreateProvinceDto | CreateProvinceDto[],
    user?: JwtPayloadDto,
  ): Promise<Province | Province[]> {
    return this.transactions(async (manager) => {
      const entities = Array.isArray(data) ? data : [data];

      const transformedEntities = entities.map((entity) => ({
        ...entity,
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
