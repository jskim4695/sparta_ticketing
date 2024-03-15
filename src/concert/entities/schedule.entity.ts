import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Concert } from "./concert.entity";
import { Ticketing } from "src/ticketing/entities/ticketing.entity";
import { Seat } from "./seat.entity";

@Entity({name: 'schedules'})
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  concertId: number

@Column({ type: 'date', nullable: false})
concertDate: Date;

@Column({ type: 'time', nullable: false })
concertTime: string

@CreateDateColumn({ type: 'timestamp', nullable: false })
created_at: Date;

@UpdateDateColumn({ type: 'timestamp', nullable: false })
updated_at: Date;

@ManyToOne(() => Concert, concert => concert.schedule, {cascade: true})
  concert: Concert

  @OneToMany(() => Ticketing, ticketing => ticketing.schedule)
  ticketing: Ticketing

  @OneToOne(() => Seat, seat => seat.schedule)
  seat: Seat
}