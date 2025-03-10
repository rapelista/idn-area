"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../../response/base.response");
class ForbiddenException extends common_1.HttpException {
    constructor(detail) {
        const errorFormat = new base_response_1.BaseExceptionResponse('permissionDenied', detail ? detail : "You don't have permission to access this resource.");
        super(errorFormat, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map