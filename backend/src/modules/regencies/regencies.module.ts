import { Module } from '@nestjs/common';
import { RegenciesService } from './regencies.service';
import { RegenciesController } from './regencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regency } from './entities/regency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regency])],
  controllers: [RegenciesController],
  providers: [RegenciesService],
  exports: [RegenciesService],
})
export class RegenciesModule {}
