"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../../response/base.response");
class ConflictException extends common_1.HttpException {
    constructor(details) {
        const response = new base_response_1.BaseExceptionResponse('conflict', details || 'Data Telah Ada');
        super(response, common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=conflict.exception.js.map