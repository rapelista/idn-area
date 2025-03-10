import { CreateVillageDto } from './dto/create-village.dto';
import { BaseService } from '../../common/service/base.service';
import { Village } from './entities/village.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { FilteringVillageDto } from './dto/filtering-village.dto';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
export declare class VillagesService extends BaseService<Village, CreateVillageDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<Village>;
    constructor(dataSource: DataSource, repository: Repository<Village>);
    defaultRelation(): {
        district: boolean;
    };
    queryBuilder(query: FilteringVillageDto): Promise<FindManyOptions<Village>>;
    create(data: CreateVillageDto | CreateVillageDto[], user?: JwtPayloadDto): Promise<Village | Village[]>;
}
