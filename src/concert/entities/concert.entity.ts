import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import {Category} from '../types/concertCategory.type'

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

  @Column({ type: 'varchar', nullable: false })
  concertTime: string

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
}