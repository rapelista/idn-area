"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../../response/base.response");
class NotFoundException extends common_1.HttpException {
    constructor(detail) {
        const errorFormat = new base_response_1.BaseExceptionResponse('notFound', detail ? detail : 'Resource not found.');
        super(errorFormat, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map