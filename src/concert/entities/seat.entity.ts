import { IsOptional } from "class-validator";
import { Concert } from "src/concert/entities/concert.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "./schedule.entity";

@Entity({
  name: 'seat'
})

export class Seat {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number

  @Column({ unsigned: true })
  scheduleId:number

  @IsOptional()
  @Column ({ unsigned:true, type: 'int', nullable: true })
  available_seats: number

  @Column ({ unsigned:true, type: 'int', nullable: true, default: 30 })
  total_seats: number
  
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date;


  @OneToOne(() => Schedule, (schedule) => schedule.seat)
  @JoinColumn()
  schedule: Schedule
}