import { ResponseProvinceDto } from '../../provinces/dto/response-province.dto';
export declare class ResponseRegencyDto {
    id: number;
    code: string;
    name: string;
    province: ResponseProvinceDto;
}
