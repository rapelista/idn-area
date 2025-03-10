import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TokenPayload } from '../interfaces/token-payload.interface';

export class TokenResponseDto implements TokenPayload {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  role: string;
}
