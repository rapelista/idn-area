"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedMediaTypeException = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../../response/base.response");
class UnsupportedMediaTypeException extends common_1.HttpException {
    constructor(detail) {
        const errorFormat = new base_response_1.BaseExceptionResponse('notAcceptable', detail ? detail : 'Unsupported media type.');
        super(errorFormat, common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
}
exports.UnsupportedMediaTypeException = UnsupportedMediaTypeException;
//# sourceMappingURL=unsupported-media-type.exception.js.map