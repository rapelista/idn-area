import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
export declare class FilteringDistrictDto extends QueryParameterDto {
    regencyCode: string;
    get regency(): {
        code: string;
    } | undefined;
}
