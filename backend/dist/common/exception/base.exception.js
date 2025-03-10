"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const base_response_1 = require("../response/base.response");
const logger_1 = require("../interceptors/logger");
function toCamelCase(str) {
    if (typeof str !== 'string') {
        str = '';
    }
    str = str.trim().toLowerCase();
    return str.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
}
let AllExceptionFilter = class AllExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const isHttpException = exception instanceof common_1.HttpException;
        let status = isHttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = isHttpException
            ? exception.getResponse()
            : new base_response_1.BaseExceptionResponse('internalServerError', 'Server error occurred.');
        let errorDetails;
        errorDetails = isHttpException
            ? JSON.stringify(exception.getResponse())
            : '';
        const isObject = typeof message === 'object';
        let isBaseExceptionFormat = message instanceof base_response_1.BaseExceptionResponse;
        if (!isBaseExceptionFormat) {
            if (Array.isArray(message)) {
                isBaseExceptionFormat = message[0] instanceof base_response_1.BaseExceptionResponse;
            }
            else {
                message = new base_response_1.BaseExceptionResponse(isObject
                    ? toCamelCase(message['error'])
                    : 'internalServerError', message['message']);
                errorDetails = JSON.stringify(message);
                isBaseExceptionFormat = true;
            }
        }
        if (isObject && !isBaseExceptionFormat) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorDetails = 'Standard error exception is not implemented correctly.';
            message = new base_response_1.BaseExceptionResponse('internalServerError', 'Server error occurred.');
        }
        let type;
        switch (status) {
            case 400:
                type = 'validationError';
                break;
            case 409:
                type = 'conflictError';
                break;
            case 500:
                type = 'serverError';
                if (!errorDetails) {
                    errorDetails = exception instanceof Error ? exception.message : '';
                }
                break;
            default:
                type = 'clientError';
        }
        const stackTrace = exception instanceof Error && exception.stack
            ? exception.stack.split('\n').join('\n')
            : 'No stack trace available';
        logger_1.logger.error(`${errorDetails}\nStackTrace:\n${stackTrace}`);
        const result = new base_response_1.BaseErrorResponse(type, Array.isArray(message) ? message : [message], `${request.method} ${request.url}`);
        response.status(status).json(result);
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
//# sourceMappingURL=base.exception.js.map