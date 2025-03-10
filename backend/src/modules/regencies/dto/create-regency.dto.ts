import { ApiProperty } from '@nestjs/swagger';

export class CreateRegencyDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  provinceId: number;

  get province(): { id: number } | undefined {
    return this.provinceId !== undefined ? { id: this.provinceId } : undefined;
  }
}
