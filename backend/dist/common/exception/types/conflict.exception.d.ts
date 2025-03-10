import { HttpException } from '@nestjs/common';
export declare class ConflictException extends HttpException {
    constructor(details?: string);
}
