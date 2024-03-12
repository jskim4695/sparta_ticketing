import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConcertDto } from './dto/createConcert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';

import { Concert } from './entities/concert.entity'
import { Repository } from 'typeorm';
@Injectable()
export class ConcertService {
  constructor(@InjectRepository(Concert)
  private readonly concertRepository: Repository<Concert>
  ) {}

  async createConcert(createConcertDto: CreateConcertDto) : Promise<Concert> {
    const newConcert: Concert = this.concertRepository.create({
      title: createConcertDto.title,
      intro: createConcertDto.intro,
      concertDate: createConcertDto.concertDate,
      concertTime: createConcertDto.concertTime,
      category: createConcertDto.category,
      concertImg: createConcertDto.concertImg
    })

    const savedConcert = await this.concertRepository.save(newConcert)
    return savedConcert
  }

  async findAll(sort: string, searchTitle?: string): Promise<Concert[]> {
    let order: any = {}

    if (sort === 'title') {
      order.title = 'ASC'
    } else {
      order.id = 'ASC'
    }
    const queryBuilder = this.concertRepository
    .createQueryBuilder('concert')
    .select(['concert.id', 'concert.title', 'concert.intro', 'concert.concertDate'])
    .orderBy(order);

  if (searchTitle) {
    queryBuilder.where('concert.title LIKE :searchTitle', { searchTitle: `%${searchTitle}%` });
  }

  return await queryBuilder.getMany();
}

  async findOne(id: number) {
    const concert = await this.verifyConcertById(id)
    const currentDateTime = new Date()
    const concertDateTime = new Date(`${concert.concertDate} ${concert.concertTime}`)

    concert.is_Available = concertDateTime >= currentDateTime

    return concert
  }

  private async verifyConcertById(id: number) {
    const concert = await this.concertRepository.findOneBy({id})
    if(_.isNil(concert)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return concert
  }
}
