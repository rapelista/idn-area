import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  villageCode: string;

  get village() {
    return this.villageCode !== undefined
      ? { code: this.villageCode }
      : undefined;
  }
}
