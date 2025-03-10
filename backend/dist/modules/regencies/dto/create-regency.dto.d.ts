export declare class CreateRegencyDto {
    code: string;
    name: string;
    provinceId: number;
    get province(): {
        id: number;
    } | undefined;
}
