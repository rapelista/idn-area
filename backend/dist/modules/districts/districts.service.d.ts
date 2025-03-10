import { CreateDistrictDto } from './dto/create-district.dto';
import { BaseService } from '../../common/service/base.service';
import { District } from './entities/district.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { FilteringDistrictDto } from './dto/filtering-district.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
export declare class DistrictsService extends BaseService<District, CreateDistrictDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<District>;
    constructor(dataSource: DataSource, repository: Repository<District>);
    defaultRelation(): {
        regency: boolean;
    };
    buildQuery(query: FilteringDistrictDto): Promise<FindManyOptions<District>>;
    create(data: CreateDistrictDto | CreateDistrictDto[], user?: JwtPayloadDto): Promise<District | District[]>;
}
