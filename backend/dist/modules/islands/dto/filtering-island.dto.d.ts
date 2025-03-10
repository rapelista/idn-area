import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
export declare class FilteringIslandDto extends QueryParameterDto {
    regencyCode?: string;
    get regency(): {
        code: string;
    } | undefined;
}
