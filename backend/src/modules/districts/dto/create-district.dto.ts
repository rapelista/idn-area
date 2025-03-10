import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  regencyCode: string;

  get regency(): { code: string } | undefined {
    return this.regencyCode !== undefined
      ? { code: this.regencyCode }
      : undefined;
  }
}
