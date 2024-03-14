import { Module } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { User } from 'src/user/entities/user.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticketing, User, Concert])],
  providers: [TicketingService],
  controllers: [TicketingController]
})
export class TicketingModule {}
