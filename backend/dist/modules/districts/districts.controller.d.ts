import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { FilteringDistrictDto } from './dto/filtering-district.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseDistrictDto } from './dto/response-district.dto';
export declare class DistrictsController {
    private readonly districtsService;
    constructor(districtsService: DistrictsService);
    create(createDistrictDto: CreateDistrictDto, req: any): Promise<BaseSuccessResponse<ResponseDistrictDto>>;
    findAll(query: FilteringDistrictDto): Promise<BaseSuccessResponse<ResponseDistrictDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseDistrictDto>>;
    update(id: string, updateDistrictDto: UpdateDistrictDto, req: any): Promise<BaseSuccessResponse<ResponseDistrictDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
