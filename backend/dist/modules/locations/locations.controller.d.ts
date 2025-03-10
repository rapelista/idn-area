import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FilteringLocationDto } from './dto/filtering-location.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseLocationDto } from './dto/response-location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(createLocationDto: CreateLocationDto, req: any): Promise<BaseSuccessResponse<ResponseLocationDto>>;
    findAll(query: FilteringLocationDto): Promise<BaseSuccessResponse<ResponseLocationDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseLocationDto>>;
    update(id: string, updateLocationDto: UpdateLocationDto, req: any): Promise<BaseSuccessResponse<ResponseLocationDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
