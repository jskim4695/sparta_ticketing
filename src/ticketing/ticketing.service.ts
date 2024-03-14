import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateTicketingDto } from './dto/createTicketing.dto';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Ticketing)
    private ticketingRepository: Repository<Ticketing>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
  ) {}

  async createTicket(userId: number, createTicketingDto: CreateTicketingDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const concert = await this.concertRepository.findOne({ where: {id: createTicketingDto.concertId}})

    if (!user || !concert) {
      throw new NotFoundException('유저나 공연을 찾을 수 없습니다.')
    }

    const ticketing = this.ticketingRepository.create({
      concert,
      ticketing_quantity: createTicketingDto.quantity,
      selectedTime: createTicketingDto.selectedTime
    })

    return this.ticketingRepository.save(ticketing)
  }

  async getTicketInfo(userId: number) {
    const Tickets = await this.ticketingRepository.find({
      where: {user: {id: userId}},
      relations: ['concert', 'user']
    })

    if(Tickets.length === 0) {
      throw new NotFoundException('예약정보를 찾을 수 없습니다.')
    }

    return Tickets
  }
}
