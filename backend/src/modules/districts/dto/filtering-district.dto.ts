import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
import { IsOptional, IsString } from 'class-validator';

export class FilteringDistrictDto extends QueryParameterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  regencyCode: string;

  get regency(): { code: string } | undefined {
    return this.regencyCode !== undefined
      ? { code: this.regencyCode }
      : undefined;
  }
}
