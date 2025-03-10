import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
import { IsOptional } from 'class-validator';

export class FilteringIslandDto extends QueryParameterDto {
  @ApiPropertyOptional()
  @IsOptional()
  regencyCode?: string;

  get regency(): { code: string } | undefined {
    return this.regencyCode !== undefined
      ? { code: this.regencyCode }
      : undefined;
  }
}
