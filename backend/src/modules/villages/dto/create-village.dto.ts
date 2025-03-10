import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVillageDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  districtCode: string;

  get district(): { code: string } | undefined {
    return this.districtCode !== undefined
      ? { code: this.districtCode }
      : undefined;
  }
}
