import { QueryParameterDto } from 'src/common/dto/query-parameter.dto';
import { Role } from '../enum/role.enum';
export declare class FilteringUserDto extends QueryParameterDto {
    role?: Role;
}
