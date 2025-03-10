import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { Role } from '../enum/role.enum';

export class ResponseUserDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  username: string;

  @Expose()
  @ApiProperty()
  @IsString()
  fullName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  role: Role;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiPropertyOptional()
  image?: string;

  @Expose()
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
