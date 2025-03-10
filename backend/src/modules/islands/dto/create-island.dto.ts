import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateIslandDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  coordinates: string;

  @ApiProperty()
  @IsNotEmpty()
  regencyCode: string;

  get regency(): { code: string } {
    return { code: this.regencyCode };
  }
}
