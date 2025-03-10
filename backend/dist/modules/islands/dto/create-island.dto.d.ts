export declare class CreateIslandDto {
    code: string;
    name: string;
    coordinates: string;
    regencyCode: string;
    get regency(): {
        code: string;
    };
}
