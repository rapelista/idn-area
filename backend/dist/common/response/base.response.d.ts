export declare class BasePaginationResponse {
    page: number;
    totalPage: number;
    totalData: number;
    constructor(page?: number, totalPage?: number, totalData?: number);
}
export declare class BaseSuccessResponse<TData> {
    data: TData | TData[];
    meta?: BasePaginationResponse | null;
    constructor(data: TData | TData[], meta?: BasePaginationResponse);
}
export declare class BaseExceptionResponse {
    code: string;
    detail: string;
    attr?: string;
    constructor(code: string, detail: string, attr?: string);
}
export declare class BaseErrorResponse {
    type: string;
    errors: BaseExceptionResponse | BaseExceptionResponse[] | string | object;
    path: string;
    timestamp?: Date;
    constructor(type: string, errors: BaseExceptionResponse | BaseExceptionResponse[] | string | object, path?: string, timestamp?: Date);
}
export declare class ResponseWrapperService {
    list<TData>(data: TData, meta: BasePaginationResponse): Promise<BaseSuccessResponse<TData>>;
    detail<TData>(data: TData): Promise<BaseSuccessResponse<TData>>;
    error(type: string, errors: BaseExceptionResponse | BaseExceptionResponse[] | string | object, path: string, timestamp?: Date): Promise<BaseErrorResponse>;
}
