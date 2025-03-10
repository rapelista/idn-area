import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilteringUserDto } from './dto/filtering-user.dto';
import { BaseSuccessResponse } from '../../common/response/base.response';
import { PathParameterIdDto } from '../../common/dto/path-parameter.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, req: any): Promise<BaseSuccessResponse<ResponseUserDto>>;
    findAll(query: FilteringUserDto): Promise<BaseSuccessResponse<ResponseUserDto>>;
    findOne(id: PathParameterIdDto): Promise<BaseSuccessResponse<ResponseUserDto>>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<BaseSuccessResponse<ResponseUserDto>>;
    remove(id: PathParameterIdDto, req: any): Promise<void>;
}
