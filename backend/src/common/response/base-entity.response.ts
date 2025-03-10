import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class BaseEntityResponse {
  @ApiProperty({
    example: 1,
    description: 'Id dari data',
    type: Number,
  })
  @Expose()
  @Type(() => Number)
  id: number;

  @ApiPropertyOptional({
    example: '2023-08-10T09:15:00.000Z',
    description: 'Tanggal pembuatan',
    required: false,
  })
  @Expose()
  @Type(() => Date)
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2023-08-11T14:30:00.000Z',
    description: 'Tanggal terakhir diupdate',
    required: false,
  })
  @Expose()
  @Type(() => Date)
  updatedAt?: Date;

  @ApiPropertyOptional({
    example: '2023-08-12T10:00:00.000Z',
    description: 'Tanggal soft delete (jika ada)',
    required: false,
  })
  @Expose()
  @Type(() => Date)
  deletedAt?: Date;

  @ApiPropertyOptional({
    example: '64d5a8f1e48dfb0a5c9b82b0',
    description: 'ID user yang membuat',
    required: false,
  })
  @Expose()
  createdBy?: string;

  @ApiPropertyOptional({
    example: '64d5a8f1e48dfb0a5c9b82b1',
    description: 'ID user yang terakhir mengupdate',
    required: false,
  })
  @Expose()
  updatedBy?: string;

  @ApiPropertyOptional({
    example: '64d5a8f1e48dfb0a5c9b82b2',
    description: 'ID user yang menghapus (jika ada)',
    required: false,
  })
  @Expose()
  deletedBy?: string;
}
