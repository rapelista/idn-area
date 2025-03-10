import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PathParameterIdDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty()
  id: number;
}
