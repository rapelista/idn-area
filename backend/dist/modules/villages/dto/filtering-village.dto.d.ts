import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
export declare class FilteringVillageDto extends QueryParameterDto {
    regencyCode: string;
    get regency(): {
        code: string;
    } | undefined;
}
