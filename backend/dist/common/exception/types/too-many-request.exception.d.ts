import { HttpException } from '@nestjs/common';
export declare class TooManyRequestException extends HttpException {
    constructor(detail?: string);
}
