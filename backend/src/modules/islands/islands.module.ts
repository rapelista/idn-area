import { Module } from '@nestjs/common';
import { IslandsService } from './islands.service';
import { IslandsController } from './islands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Island } from './entities/island.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Island])],
  controllers: [IslandsController],
  providers: [IslandsService],
  exports: [IslandsService],
})
export class IslandsModule {}
