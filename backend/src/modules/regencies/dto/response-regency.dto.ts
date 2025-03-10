import { ApiProperty } from '@nestjs/swagger';
import { ResponseProvinceDto } from '../../provinces/dto/response-province.dto';

export class ResponseRegencyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  province: ResponseProvinceDto;
}
