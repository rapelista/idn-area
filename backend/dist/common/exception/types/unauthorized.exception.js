"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../../response/base.response");
class UnauthorizedException extends common_1.HttpException {
    constructor(code, detail) {
        const errorFormat = new base_response_1.BaseExceptionResponse(code ? code : 'notAuthenticated', detail ? detail : 'Authentication credentials not provided.');
        super(errorFormat, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map