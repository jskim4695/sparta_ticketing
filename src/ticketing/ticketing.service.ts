import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateTicketingDto } from './dto/createTicketing.dto';
import { PointTransaction } from 'src/point/entities/point.entity';
import { Schedule } from 'src/concert/entities/schedule.entity';
import { Seat } from 'src/concert/entities/seat.entity';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Ticketing)
    private ticketingRepository: Repository<Ticketing>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(PointTransaction)
    private pointRepository: Repository<PointTransaction>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async createTicket(userId: number, {scheduleId}: CreateTicketingDto){
    // 공연 회차 정보
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const schedule = await this.scheduleRepository.findOne({
      where: {id: scheduleId},
      relations: {
        concert: true,
      }
    })
    const remainedPoint = await this.pointRepository.findOne({
      order: {
        changeDate: 'DESC'
      }
    })

    if (!user || !schedule) {
      throw new NotFoundException('유저나 공연을 찾을 수 없습니다.')
    }
// 예매 내역 생성
    const ticketing =await this.ticketingRepository.save({
      userId,
      scheduleId,
    })

    // 포인트 차감=> 레코드 생성
    const price = schedule.concert.price
    const point = await this.pointRepository.save({
      balance: remainedPoint.balance-price,
      pointHistory: -price,
      pointReason: `${schedule.concert.title} 예매`
    })

    // 좌석 개수 줄이기

    const seat = await this.seatRepository.findOneBy({
      scheduleId
    })
    await this.seatRepository.save({
      id:seat.id, availableSeat: seat.available_seats-1
    })

    return ticketing
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
