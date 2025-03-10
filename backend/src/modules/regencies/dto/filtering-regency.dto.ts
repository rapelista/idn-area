import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
import { IsOptional } from 'class-validator';

export class FilteringRegencyDto extends QueryParameterDto {
  @ApiPropertyOptional()
  @IsOptional()
  provinceCode?: string;

  get province(): { code: string } | undefined {
    return this.provinceCode !== undefined
      ? { code: this.provinceCode }
      : undefined;
  }
}
