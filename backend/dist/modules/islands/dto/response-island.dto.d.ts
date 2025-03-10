import { ResponseProvinceDto } from '../../provinces/dto/response-province.dto';
export declare class ResponseIslandDto {
    id: number;
    code: string;
    name: string;
    coordinates: string;
    province: ResponseProvinceDto;
}
