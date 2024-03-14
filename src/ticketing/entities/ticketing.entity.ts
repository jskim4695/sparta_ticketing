import { IsOptional } from "class-validator";
import { Concert } from "src/concert/entities/concert.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: 'ticketing'
})

export class Ticketing {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: false })
  ticketing_quantity: number

  @Column({ type: "varchar", nullable: false })
  selectedTime: string

  @CreateDateColumn({ nullable: false })
  created_at: Date

  @IsOptional()
  @DeleteDateColumn({ nullable: true}) // 예매취소 여부를 나타냄
  deleted_at?: Date

  @ManyToOne(() => User, (user) => user.ticketing)
  user: User

  @OneToOne(() => Concert, concert => concert.ticketing)
  concert: Concert
}