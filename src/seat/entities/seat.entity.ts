import { IsOptional } from "class-validator";
import { Concert } from "src/concert/entities/concert.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'seat'
})

export class Seat {
  @PrimaryGeneratedColumn()
  id: number

  @IsOptional()
  @Column ({ type: 'int', nullable: true, default: 30 })
  seat_num?: number

  @Column ({ type: 'bigint', nullable: false, default: 30000})
  price: number

  @ManyToOne(() => Concert, (concert) => concert.seat)
  concert: Concert
}