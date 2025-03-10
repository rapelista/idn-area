import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseDistrictDto } from '../../districts/dto/response-district.dto';

export class ResponseVillageDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({
    type: () => ResponseDistrictDto,
  })
  @Type(() => ResponseDistrictDto)
  district: ResponseDistrictDto;
}
