import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import {Category} from '../types/concertCategory.type'
import {PerformPlace} from '../types/performPlace.type'
import { Ticketing } from "src/ticketing/entities/ticketing.entity";
import { Seat } from "src/concert/entities/seat.entity";
import { Schedule } from "./schedule.entity";

@Entity({
  name: 'concert'
})

export class Concert {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false})
  intro: string;

  @Column({ type: 'varchar', nullable: false})
  concertDate: string;

  @Column( 'simple-array', { nullable: false })
  concertTime: string[]

  @Column ({ type: 'bigint', nullable: false, default: 30000})
  price: number

  @Column({ type: 'varchar', nullable: false})
  place: PerformPlace

  @Column({ type: 'varchar', nullable: true })
  concertImg: string

  @Column({ type: 'varchar', nullable: false })
  category: Category

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date;

  @Column({ default: true })
  is_Available: boolean;

  @OneToMany(() => Schedule, (schedule) => schedule.concert)
  schedule: Schedule[]
}