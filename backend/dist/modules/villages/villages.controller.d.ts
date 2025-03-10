import { VillagesService } from './villages.service';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { FilteringVillageDto } from './dto/filtering-village.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseVillageDto } from './dto/response-village.dto';
export declare class VillagesController {
    private readonly villagesService;
    constructor(villagesService: VillagesService);
    create(createVillageDto: CreateVillageDto, req: any): Promise<BaseSuccessResponse<ResponseVillageDto>>;
    findAll(query: FilteringVillageDto): Promise<BaseSuccessResponse<ResponseVillageDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseVillageDto>>;
    update(id: string, updateVillageDto: UpdateVillageDto, req: any): Promise<BaseSuccessResponse<ResponseVillageDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
