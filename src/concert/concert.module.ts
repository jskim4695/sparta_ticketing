import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Concert } from './entities/concert.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([Concert]),
  ],
  providers: [ConcertService],
  controllers: [ConcertController]
})
export class ConcertModule {}
