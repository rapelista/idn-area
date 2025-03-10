import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
export declare class FilteringRegencyDto extends QueryParameterDto {
    provinceCode?: string;
    get province(): {
        code: string;
    } | undefined;
}
