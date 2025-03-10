import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryParameterDto } from 'src/common/dto/query-parameter.dto';
import { Role } from '../enum/role.enum';
import { IsOptional } from 'class-validator';

export class FilteringUserDto extends QueryParameterDto {
  @ApiPropertyOptional({
    enum: Role,
    description: 'Filtering user by role',
  })
  @IsOptional()
  role?: Role;
}
