import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class QueryParameterDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Sorting order in the format field:DIRECTION',
    example: ['createdAt:DESC', 'title:ASC'],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  orderBy?: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}
