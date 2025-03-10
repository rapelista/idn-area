"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestException = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../../response/base.response");
class TooManyRequestException extends common_1.HttpException {
    constructor(detail) {
        const errorFormat = new base_response_1.BaseExceptionResponse('throttled', detail ? detail : 'Too many requests.');
        super(errorFormat, common_1.HttpStatus.TOO_MANY_REQUESTS);
    }
}
exports.TooManyRequestException = TooManyRequestException;
//# sourceMappingURL=too-many-request.exception.js.map