import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';

export class FilteringVillageDto extends QueryParameterDto {
  @ApiPropertyOptional()
  @IsOptional()
  regencyCode: string;

  get regency() {
    return this.regencyCode !== undefined
      ? { code: this.regencyCode }
      : undefined;
  }
}
