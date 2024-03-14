import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import {Category} from '../types/concertCategory.type'
import {PerformPlace} from '../types/performPlace.type'
import { Ticketing } from "src/ticketing/entities/ticketing.entity";
import { Seat } from "src/seat/entities/seat.entity";

@Entity({
  name: 'concert'
})

export class Concert {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false})
  intro: string;

  @Column({ type: 'varchar', nullable: false})
  concertDate: string;

  @Column( 'simple-array', { nullable: false })
  concertTime: string[]

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


  @OneToOne(() => Ticketing, ticketing => ticketing.concert)
  @JoinColumn()
  ticketing: Ticketing

  @OneToMany(() => Seat, (seat) => seat.concert)
  seat: Seat[]
}