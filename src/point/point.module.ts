import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointTransaction } from './entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointTransaction])],
  providers: [],
  controllers: []
})
export class PointModule {}
