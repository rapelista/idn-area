import { ResponseProvinceDto } from '../../provinces/dto/response-province.dto';
export declare class ResponseDistrictDto {
    id: number;
    code: string;
    name: string;
    province: ResponseProvinceDto;
}
