export declare class CreateVillageDto {
    code: string;
    name: string;
    districtCode: string;
    get district(): {
        code: string;
    } | undefined;
}
