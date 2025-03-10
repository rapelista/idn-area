import { CreateIslandDto } from './dto/create-island.dto';
import { BaseService } from '../../common/service/base.service';
import { Island } from './entities/island.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { FilteringIslandDto } from './dto/filtering-island.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
export declare class IslandsService extends BaseService<Island, CreateIslandDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<Island>;
    constructor(dataSource: DataSource, repository: Repository<Island>);
    defaultRelation(): {};
    buildQuery(query: FilteringIslandDto): Promise<FindManyOptions<Island>>;
    create(data: CreateIslandDto | CreateIslandDto[], user?: JwtPayloadDto): Promise<Island | Island[]>;
}
