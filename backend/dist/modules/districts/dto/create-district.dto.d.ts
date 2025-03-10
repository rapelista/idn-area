export declare class CreateDistrictDto {
    code: string;
    name: string;
    regencyCode: string;
    get regency(): {
        code: string;
    } | undefined;
}
