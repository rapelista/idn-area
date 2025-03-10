import { Module } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { VillagesController } from './villages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Village } from './entities/village.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Village])],
  controllers: [VillagesController],
  providers: [VillagesService],
  exports: [VillagesService],
})
export class VillagesModule {}
