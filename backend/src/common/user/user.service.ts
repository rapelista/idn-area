import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  Repository,
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  In,
} from 'typeorm';
import { BaseService } from '../../common/service/base.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FilteringUserDto } from './dto/filtering-user.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto> {
  constructor(
    protected readonly dataSource: DataSource,
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(dataSource, repository);
  }

  defaultRelation() {
    return {};
  }

  public async queryBuilder(
    query: FilteringUserDto,
  ): Promise<FindManyOptions<User>> {
    const { page, limit, orderBy = ['id:DESC'], search, ...filters } = query;

    const where: FindOptionsWhere<User> = {
      ...(search && { username: ILike(`%${search}%`) }),
      ...(filters.role && { role: filters.role }),
    };

    const queryOptions: FindManyOptions<User> = await super.buildQuery(
      where,
      this.defaultRelation(),
      {
        limit,
        page,
        orderBy: Array.isArray(orderBy) ? orderBy : [orderBy],
      },
    );

    return queryOptions;
  }

  async create(
    data: CreateUserDto | CreateUserDto[],
    user?: JwtPayloadDto,
  ): Promise<User | User[]> {
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
