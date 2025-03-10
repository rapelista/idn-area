import { BaseService } from '../../common/service/base.service';
import { Location } from './entities/location.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { FilteringLocationDto } from './dto/filtering-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
export declare class LocationsService extends BaseService<Location, CreateLocationDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<Location>;
    constructor(dataSource: DataSource, repository: Repository<Location>);
    defaultRelation(): {
        village: boolean;
    };
    queryBuilder(query: FilteringLocationDto): Promise<FindManyOptions<Location>>;
    create(data: CreateLocationDto | CreateLocationDto[], user?: JwtPayloadDto): Promise<Location | Location[]>;
}
