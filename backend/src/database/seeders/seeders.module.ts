import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/user/entities/user.entity';
import { Province } from '../../modules/provinces/entities/province.entity';
import { Regency } from '../../modules/regencies/entities/regency.entity';
import { District } from '../../modules/districts/entities/district.entity';
import { Village } from '../../modules/villages/entities/village.entity';
import { Island } from '../../modules/islands/entities/island.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Province,
      Regency,
      District,
      Village,
      Island,
    ]),
  ],
  providers: [SeedersService],
  exports: [SeedersService],
})
export class SeedersModule {}
