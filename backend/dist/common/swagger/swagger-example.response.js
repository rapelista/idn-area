"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSwaggerExample = ListSwaggerExample;
exports.DetailSwaggerExample = DetailSwaggerExample;
exports.CreateSwaggerExample = CreateSwaggerExample;
exports.DeleteSwaggerExample = DeleteSwaggerExample;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const base_response_1 = require("../response/base.response");
function successSchema(data, isArray = false, isMeta = false) {
    let meta = null;
    if (isMeta) {
        meta = {
            example: new base_response_1.BasePaginationResponse(),
        };
    }
    let dataValue = {
        $ref: (0, swagger_1.getSchemaPath)(data),
    };
    if (isArray) {
        dataValue = {
            type: 'array',
            items: {
                $ref: (0, swagger_1.getSchemaPath)(data),
            },
        };
    }
    return {
        allOf: [
            {
                properties: {
                    data: dataValue,
                    ...(meta && { meta }),
                },
            },
        ],
    };
}
function errorSchema(type, errors) {
    return {
        allOf: [
            {
                example: base_response_1.BaseErrorResponse,
            },
            {
                properties: {
                    type: {
                        example: type,
                    },
                    errors: {
                        example: [errors],
                    },
                    timestamp: {
                        example: new Date(),
                    },
                },
            },
        ],
    };
}
function listSuccessResponse(data, isMeta = true) {
    return (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        schema: successSchema(data, true, isMeta),
    });
}
function detailSuccessResponse(data) {
    return (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        schema: successSchema(data),
    });
}
function createSuccessResponse(data, isArray) {
    if (isArray) {
        return (0, swagger_1.ApiCreatedResponse)({
            description: 'Success Created',
            schema: successSchema(data, isArray),
        });
    }
    return (0, swagger_1.ApiCreatedResponse)({
        description: 'Success Created',
        schema: successSchema(data),
    });
}
function deleteSuccessResponse() {
    return (0, swagger_1.ApiNoContentResponse)({ description: 'Success' });
}
function errorServerResponse() {
    const errorResponse = new base_response_1.BaseExceptionResponse('internalServerError', 'Server error occurred.');
    return (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal Server Error',
        schema: errorSchema('serverError', errorResponse),
    });
}
function errorUnauthorizedResponse() {
    const notAuthResponse = new base_response_1.BaseExceptionResponse('notAuthenticated', 'Authentication credentials not provided.');
    const expiredAuthResponse = new base_response_1.BaseExceptionResponse('expiredCredential', 'Your credentials have expired.');
    const invalidAuthResponse = new base_response_1.BaseExceptionResponse('invalidCredential', 'Your credentials is invalid.');
    const coreNotAuth = new base_response_1.BaseErrorResponse('clientError', [notAuthResponse]);
    const coreExpiredAuth = new base_response_1.BaseErrorResponse('clientError', [
        expiredAuthResponse,
    ]);
    const coreInvalidAuth = new base_response_1.BaseErrorResponse('clientError', [
        invalidAuthResponse,
    ]);
    return (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        content: {
            'application/json': {
                examples: {
                    notAuthenticate: { value: coreNotAuth },
                    expiredAuthenticate: { value: coreExpiredAuth },
                    invalidAuthenticate: { value: coreInvalidAuth },
                },
            },
        },
    });
}
function errorForbiddenResponse() {
    const errorsResponse = new base_response_1.BaseExceptionResponse('permissionDenied', "You don't have permission to access this resource.");
    return (0, swagger_1.ApiForbiddenResponse)({
        description: 'Forbidden',
        schema: errorSchema('clientError', errorsResponse),
    });
}
function errorNotFoundResponse() {
    const errorsResponse = new base_response_1.BaseExceptionResponse('notFound', 'Resource not found.');
    return (0, swagger_1.ApiNotFoundResponse)({
        description: 'Not Found',
        schema: errorSchema('clientError', errorsResponse),
    });
}
function errorConflictResponse() {
    const errorsResponse = new base_response_1.BaseExceptionResponse('conflict', 'Data already exists.');
    return (0, swagger_1.ApiConflictResponse)({
        description: 'Conflict',
        schema: errorSchema('conflictError', errorsResponse),
    });
}
function errorBadRequestResponse() {
    const firstErrorResponse = new base_response_1.BaseExceptionResponse('required', 'This field is required.', 'fieldName');
    const secondErrorResponse = new base_response_1.BaseExceptionResponse('minLength', 'This field is too short.', 'fieldName');
    return (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad Request',
        schema: errorSchema('validationError', [
            firstErrorResponse,
            secondErrorResponse,
        ]),
    });
}
function errorUnsupportedMediaResponse() {
    const errorsResponse = new base_response_1.BaseExceptionResponse('notAcceptable', 'Unsupported media type.');
    return (0, swagger_1.ApiUnsupportedMediaTypeResponse)({
        description: 'Unsupported Media',
        schema: errorSchema('clientError', errorsResponse),
    });
}
function errorTooManyRequestResponse() {
    const errorsResponse = new base_response_1.BaseExceptionResponse('throttled', 'Too many requests.');
    return (0, swagger_1.ApiTooManyRequestsResponse)({
        description: 'Too Many Requests.',
        schema: errorSchema('clientError', errorsResponse),
    });
}
function basicError() {
    return (0, common_1.applyDecorators)(errorUnauthorizedResponse(), errorForbiddenResponse(), errorUnsupportedMediaResponse(), errorServerResponse(), errorTooManyRequestResponse(), errorBadRequestResponse());
}
function ListSwaggerExample(data, message, meta) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: message }), (0, swagger_1.ApiExtraModels)(data, base_response_1.BaseSuccessResponse), listSuccessResponse(data, meta), basicError());
}
function DetailSwaggerExample(data, message) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: message }), (0, swagger_1.ApiExtraModels)(data, base_response_1.BaseSuccessResponse), detailSuccessResponse(data), basicError(), errorNotFoundResponse());
}
function CreateSwaggerExample(data, response, isArray, message) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: message }), (0, swagger_1.ApiExtraModels)(data, response), createSuccessResponse(response, isArray), basicError(), errorConflictResponse(), (0, swagger_1.ApiBody)({
        type: data,
        isArray: isArray,
    }));
}
function DeleteSwaggerExample(message, description) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: message, description: description }), deleteSuccessResponse(), basicError());
}
//# sourceMappingURL=swagger-example.response.js.map