import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { CreateTicketingDto } from './dto/createTicketing.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async cerateTicketing(@UserInfo() user: User, @Body() createTicketingDto: CreateTicketingDto) {
    return await this.ticketingService.createTicket(user.id, createTicketingDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getTicketing(@UserInfo() user:User) {
    return await this.ticketingService.getTicketInfo(user.id)
  }

}
