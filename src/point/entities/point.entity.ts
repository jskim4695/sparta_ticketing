import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PointTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  balance: number

  @Column('int')
  pointHistory: number

  @CreateDateColumn()
  changeDate: Date

  @Column()
  changeReason: string

  @ManyToOne(() => User, (user) => user.pointTransaction)
  user: User
}