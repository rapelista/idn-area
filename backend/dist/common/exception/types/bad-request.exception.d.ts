import { HttpException } from '@nestjs/common';
import { BaseExceptionResponse } from 'src/common/response/base.response';
export declare class BadRequestException extends HttpException {
    constructor(details?: BaseExceptionResponse | BaseExceptionResponse[]);
}
