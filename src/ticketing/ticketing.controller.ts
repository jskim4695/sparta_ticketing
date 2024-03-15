import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
  async cerateTicketing(@UserInfo() user: User, @Body() scheduleId: CreateTicketingDto) {
    const data = await this.ticketingService.createTicket(user.id, scheduleId)

    return {
      statusCode: HttpStatus.CREATED,
      message: '예매에 성공하였습니다.',
      data,
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getTicketing(@UserInfo() user:User) {
    return await this.ticketingService.getTicketInfo(user.id)
  }

}
