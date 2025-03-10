import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import {
  BaseErrorResponse,
  BaseExceptionResponse,
  BasePaginationResponse,
  BaseSuccessResponse,
} from '../response/base.response';

interface Model {
  new (...args: any[]): object;
}

function successSchema(
  data: Model,
  isArray: boolean = false,
  isMeta: boolean = false,
): SchemaObject {
  let meta = null;
  if (isMeta) {
    meta = {
      example: new BasePaginationResponse(),
    };
  }
  let dataValue: object = {
    $ref: getSchemaPath(data),
  };
  if (isArray) {
    dataValue = {
      type: 'array',
      items: {
        $ref: getSchemaPath(data),
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

function errorSchema(type: string, errors?: any | any[]): SchemaObject {
  return {
    allOf: [
      {
        example: BaseErrorResponse,
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

function listSuccessResponse(data: Model, isMeta: boolean = true) {
  return ApiOkResponse({
    description: 'Success',
    schema: successSchema(data, true, isMeta),
  });
}

function detailSuccessResponse(data: Model) {
  return ApiOkResponse({
    description: 'Success',
    schema: successSchema(data),
  });
}

function createSuccessResponse(data: Model, isArray?: boolean) {
  if (isArray) {
    return ApiCreatedResponse({
      description: 'Success Created',
      schema: successSchema(data, isArray),
    });
  }
  return ApiCreatedResponse({
    description: 'Success Created',
    schema: successSchema(data),
  });
}

function deleteSuccessResponse() {
  return ApiNoContentResponse({ description: 'Success' });
}

function errorServerResponse() {
  const errorResponse = new BaseExceptionResponse(
    'internalServerError',
    'Server error occurred.',
  );
  return ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    schema: errorSchema('serverError', errorResponse),
  });
}

function errorUnauthorizedResponse() {
  const notAuthResponse = new BaseExceptionResponse(
    'notAuthenticated',
    'Authentication credentials not provided.',
  );
  const expiredAuthResponse = new BaseExceptionResponse(
    'expiredCredential',
    'Your credentials have expired.',
  );
  const invalidAuthResponse = new BaseExceptionResponse(
    'invalidCredential',
    'Your credentials is invalid.',
  );
  const coreNotAuth = new BaseErrorResponse('clientError', [notAuthResponse]);
  const coreExpiredAuth = new BaseErrorResponse('clientError', [
    expiredAuthResponse,
  ]);
  const coreInvalidAuth = new BaseErrorResponse('clientError', [
    invalidAuthResponse,
  ]);
  return ApiUnauthorizedResponse({
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
  const errorsResponse = new BaseExceptionResponse(
    'permissionDenied',
    "You don't have permission to access this resource.",
  );
  return ApiForbiddenResponse({
    description: 'Forbidden',
    schema: errorSchema('clientError', errorsResponse),
  });
}

function errorNotFoundResponse() {
  const errorsResponse = new BaseExceptionResponse(
    'notFound',
    'Resource not found.',
  );
  return ApiNotFoundResponse({
    description: 'Not Found',
    schema: errorSchema('clientError', errorsResponse),
  });
}

function errorConflictResponse() {
  const errorsResponse = new BaseExceptionResponse(
    'conflict',
    'Data already exists.',
  );

  return ApiConflictResponse({
    description: 'Conflict',
    schema: errorSchema('conflictError', errorsResponse),
  });
}

function errorBadRequestResponse() {
  const firstErrorResponse = new BaseExceptionResponse(
    'required',
    'This field is required.',
    'fieldName',
  );
  const secondErrorResponse = new BaseExceptionResponse(
    'minLength',
    'This field is too short.',
    'fieldName',
  );
  return ApiBadRequestResponse({
    description: 'Bad Request',
    schema: errorSchema('validationError', [
      firstErrorResponse,
      secondErrorResponse,
    ]),
  });
}

function errorUnsupportedMediaResponse() {
  const errorsResponse = new BaseExceptionResponse(
    'notAcceptable',
    'Unsupported media type.',
  );
  return ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported Media',
    schema: errorSchema('clientError', errorsResponse),
  });
}

function errorTooManyRequestResponse() {
  const errorsResponse = new BaseExceptionResponse(
    'throttled',
    'Too many requests.',
  );
  return ApiTooManyRequestsResponse({
    description: 'Too Many Requests.',
    schema: errorSchema('clientError', errorsResponse),
  });
}

function basicError() {
  return applyDecorators(
    errorUnauthorizedResponse(),
    errorForbiddenResponse(),
    errorUnsupportedMediaResponse(),
    errorServerResponse(),
    errorTooManyRequestResponse(),
    errorBadRequestResponse(),
  );
}

export function ListSwaggerExample(
  data: Model,
  message: string,
  meta?: boolean,
) {
  return applyDecorators(
    ApiOperation({ summary: message }),
    ApiExtraModels(data, BaseSuccessResponse),
    listSuccessResponse(data, meta),
    basicError(),
  );
}

export function DetailSwaggerExample(data: Model, message?: string) {
  return applyDecorators(
    ApiOperation({ summary: message }),
    ApiExtraModels(data, BaseSuccessResponse),
    detailSuccessResponse(data),
    basicError(),
    errorNotFoundResponse(),
  );
}

export function CreateSwaggerExample(
  data: Model,
  response: Model,
  isArray: boolean,
  message?: string,
) {
  return applyDecorators(
    ApiOperation({ summary: message }),
    ApiExtraModels(data, response),
    createSuccessResponse(response, isArray),
    basicError(),
    errorConflictResponse(),
    ApiBody({
      type: data,
      isArray: isArray,
    }),
  );
}

export function DeleteSwaggerExample(message?: string, description?: string) {
  return applyDecorators(
    ApiOperation({ summary: message, description: description }),
    deleteSuccessResponse(),
    basicError(),
  );
}
