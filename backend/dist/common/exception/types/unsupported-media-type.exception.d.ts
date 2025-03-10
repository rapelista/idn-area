import { HttpException } from '@nestjs/common';
export declare class UnsupportedMediaTypeException extends HttpException {
    constructor(detail?: string);
}
