export declare class CreateLocationDto {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    villageCode: string;
    get village(): {
        code: string;
    } | undefined;
}
