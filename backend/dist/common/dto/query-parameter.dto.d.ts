import { PaginationDto } from './pagination.dto';
export declare class QueryParameterDto extends PaginationDto {
    orderBy?: string[];
    search?: string;
}
