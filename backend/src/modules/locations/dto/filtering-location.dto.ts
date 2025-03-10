import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryParameterDto } from '../../../common/dto/query-parameter.dto';
import { IsOptional } from 'class-validator';

export class FilteringLocationDto extends QueryParameterDto {
  @ApiPropertyOptional()
  @IsOptional()
  villageCode: string;

  get village() {
    return this.villageCode !== undefined
      ? { code: this.villageCode }
      : undefined;
  }
}
