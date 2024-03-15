import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Concert } from "src/concert/entities/concert.entity";
import { Schedule } from "src/concert/entities/schedule.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: 'ticketing'
})

export class Ticketing{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @IsNumber()
  @IsNotEmpty()
  @Column({ unsigned: true })
  scheduleId: number

  @Column({ type: 'int', nullable: false })
  ticketing_quantity: number

  @CreateDateColumn({ nullable: false })
  created_at: Date

  @IsOptional()
  @DeleteDateColumn({ nullable: true}) // 예매취소 여부를 나타냄
  deleted_at?: Date

  @ManyToOne(() => User, (user) => user.ticketing)
  user: User

  @ManyToOne(() => Schedule, schedule => schedule.ticketing)
  schedule: Schedule
}