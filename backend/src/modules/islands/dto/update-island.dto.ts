import { PartialType } from '@nestjs/swagger';
import { CreateIslandDto } from './create-island.dto';

export class UpdateIslandDto extends PartialType(CreateIslandDto) {}
