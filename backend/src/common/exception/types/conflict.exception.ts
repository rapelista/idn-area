import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionResponse } from '../../response/base.response';

export class ConflictException extends HttpException {
  constructor(details?: string) {
    const response = new BaseExceptionResponse(
      'conflict',
      details || 'Data Telah Ada',
    );
    super(response, HttpStatus.CONFLICT);
  }
}
