import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { FilteringProvinceDto } from './dto/filtering-province.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseProvinceDto } from './dto/response-province.dto';
export declare class ProvincesController {
    private readonly provincesService;
    constructor(provincesService: ProvincesService);
    create(createProvinceDto: CreateProvinceDto, req: any): Promise<BaseSuccessResponse<ResponseProvinceDto>>;
    findAll(query: FilteringProvinceDto): Promise<BaseSuccessResponse<ResponseProvinceDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseProvinceDto>>;
    update(id: string, updateProvinceDto: UpdateProvinceDto, req: any): Promise<BaseSuccessResponse<ResponseProvinceDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
