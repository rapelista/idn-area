import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseRegencyDto } from '../../regencies/dto/response-regency.dto';
import { ResponseProvinceDto } from '../../provinces/dto/response-province.dto';

export class ResponseDistrictDto {
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
    type: () => ResponseRegencyDto,
  })
  @Expose()
  @Type(() => ResponseRegencyDto)
  province: ResponseProvinceDto;
}
