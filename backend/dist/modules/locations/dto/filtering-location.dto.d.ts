import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
export declare class FilteringLocationDto extends QueryParameterDto {
    villageCode: string;
    get village(): {
        code: string;
    } | undefined;
}
