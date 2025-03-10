import { HttpException } from '@nestjs/common';
export declare class UnauthorizedException extends HttpException {
    constructor(code?: string, detail?: string);
}
