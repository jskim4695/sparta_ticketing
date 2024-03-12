import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { Concert } from './entities/concert.entity';
import { CreateConcertDto } from './dto/createConcert.dto';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@UserInfo() user: User, @Body() createConcertDto: CreateConcertDto) {
    if (user.is_admin === false) {
      throw new Error('권한이 없습니다.')
    }
    return await this.concertService.createConcert(createConcertDto)
  }

  @Get()
  async getConcerts(@Query('sort') sort: string, @Query('searchTitle') searchTitle?: string) {
    return await this.concertService.findAll(sort, searchTitle)
  }

  @Get(':id')
  async findConcert(@Param('id') id: number) {
    return await this.concertService.findOne(id)
  }
}
