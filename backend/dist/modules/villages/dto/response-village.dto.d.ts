import { ResponseDistrictDto } from '../../districts/dto/response-district.dto';
export declare class ResponseVillageDto {
    id: number;
    code: string;
    name: string;
    district: ResponseDistrictDto;
}
