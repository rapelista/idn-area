import { CreateRegencyDto } from './dto/create-regency.dto';
import { BaseService } from '../../common/service/base.service';
import { Regency } from './entities/regency.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { FilteringRegencyDto } from './dto/filtering-regency.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
export declare class RegenciesService extends BaseService<Regency, CreateRegencyDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<Regency>;
    constructor(dataSource: DataSource, repository: Repository<Regency>);
    defaultRelation(): {
        province: boolean;
    };
    buildQuery(query: FilteringRegencyDto): Promise<FindManyOptions<Regency>>;
    create(data: CreateRegencyDto | CreateRegencyDto[], user?: JwtPayloadDto): Promise<Regency | Regency[]>;
}
