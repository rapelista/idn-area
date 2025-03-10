import { DataSource, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { BaseEntity } from '../entity/base.entity';
import { QueryParameterDto } from '../dto/query-parameter.dto';
export declare abstract class BaseService<TEntity extends BaseEntity, TCreate> {
    protected dataSource: DataSource;
    protected entitiesRepository: Repository<TEntity>;
    constructor(dataSource: DataSource, entitiesRepository: Repository<TEntity>);
    getQueryRunner(): Promise<QueryRunner>;
    transactions<T>(callback: (manager: QueryRunner['manager']) => Promise<T>): Promise<T>;
    create(data: TCreate | TCreate[], user?: JwtPayloadDto): Promise<TEntity | TEntity[]>;
    update(id: number, data: Partial<TCreate>, user?: JwtPayloadDto): Promise<TEntity>;
    buildQuery(whereQuery: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[], relationsQuery: FindOptionsRelations<TEntity>, paginationQuery?: QueryParameterDto): Promise<FindManyOptions<TEntity>>;
    findAndCount(options?: FindManyOptions<TEntity>): Promise<[TEntity[], number]>;
    findBy(options: FindManyOptions<TEntity>): Promise<TEntity[] | []>;
    findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null>;
    exist(options: FindOneOptions<TEntity>): Promise<boolean>;
    count(options: FindOneOptions<TEntity>): Promise<number>;
    remove(option: FindOptionsWhere<TEntity>, user?: JwtPayloadDto): Promise<boolean>;
}
