import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseVillageDto } from '../../villages/dto/response-village.dto';

export class ResponseLocationDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  latitude: number;

  @ApiProperty()
  @Expose()
  longitude: number;

  @ApiProperty({
    type: () => ResponseVillageDto,
  })
  @Expose()
  @Type(() => ResponseVillageDto)
  village: ResponseVillageDto;
}
