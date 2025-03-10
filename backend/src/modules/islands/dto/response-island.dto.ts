import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseProvinceDto } from '../../provinces/dto/response-province.dto';

export class ResponseIslandDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  coordinates: string;

  @ApiProperty({
    type: () => ResponseProvinceDto,
  })
  @Expose()
  @Type(() => ResponseProvinceDto)
  province: ResponseProvinceDto;
}
