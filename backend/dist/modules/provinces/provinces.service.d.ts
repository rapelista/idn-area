import { CreateProvinceDto } from './dto/create-province.dto';
import { BaseService } from '../../common/service/base.service';
import { Province } from './entities/province.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { JwtPayloadDto } from '../../common/dto/jwt-payload.dto';
import { FilteringProvinceDto } from './dto/filtering-province.dto';
export declare class ProvincesService extends BaseService<Province, CreateProvinceDto> {
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<Province>;
    constructor(dataSource: DataSource, repository: Repository<Province>);
    defaultRelation(): {};
    queryBuilder(query: FilteringProvinceDto): Promise<FindManyOptions<Province>>;
    create(data: CreateProvinceDto | CreateProvinceDto[], user?: JwtPayloadDto): Promise<Province | Province[]>;
}
