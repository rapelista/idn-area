import { ResponseVillageDto } from '../../villages/dto/response-village.dto';
export declare class ResponseLocationDto {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    village: ResponseVillageDto;
}
