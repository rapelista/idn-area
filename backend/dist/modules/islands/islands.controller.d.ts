import { IslandsService } from './islands.service';
import { CreateIslandDto } from './dto/create-island.dto';
import { UpdateIslandDto } from './dto/update-island.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { FilteringIslandDto } from './dto/filtering-island.dto';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseIslandDto } from './dto/response-island.dto';
export declare class IslandsController {
    private readonly islandsService;
    constructor(islandsService: IslandsService);
    create(createIslandDto: CreateIslandDto, req: any): Promise<BaseSuccessResponse<ResponseIslandDto>>;
    findAll(query: FilteringIslandDto): Promise<BaseSuccessResponse<ResponseIslandDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseIslandDto>>;
    update(id: string, updateIslandDto: UpdateIslandDto, req: any): Promise<BaseSuccessResponse<ResponseIslandDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
