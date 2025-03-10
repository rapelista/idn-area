import { DataSource, Repository, FindManyOptions } from 'typeorm';
import { BaseService } from '../../common/service/base.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FilteringUserDto } from './dto/filtering-user.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
export declare class UserService extends BaseService<User, CreateUserDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<User>;
    constructor(dataSource: DataSource, repository: Repository<User>);
    defaultRelation(): {};
    queryBuilder(query: FilteringUserDto): Promise<FindManyOptions<User>>;
    create(data: CreateUserDto | CreateUserDto[], user?: JwtPayloadDto): Promise<User | User[]>;
}
