import { RegenciesService } from './regencies.service';
import { CreateRegencyDto } from './dto/create-regency.dto';
import { UpdateRegencyDto } from './dto/update-regency.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { FilteringRegencyDto } from './dto/filtering-regency.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseRegencyDto } from './dto/response-regency.dto';
export declare class RegenciesController {
    private readonly regenciesService;
    constructor(regenciesService: RegenciesService);
    create(createRegencyDto: CreateRegencyDto, req: any): Promise<BaseSuccessResponse<ResponseRegencyDto>>;
    findAll(query: FilteringRegencyDto): Promise<BaseSuccessResponse<ResponseRegencyDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseRegencyDto>>;
    update(id: string, updateRegencyDto: UpdateRegencyDto, req: any): Promise<BaseSuccessResponse<ResponseRegencyDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
