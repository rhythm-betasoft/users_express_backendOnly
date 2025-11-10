import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn  } from "typeorm";
import {User} from './User'
@Entity("spends")   
export class Spend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salary!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  expenses!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  saving!: number;
   @Column()
  user_id!: number;

  @ManyToOne(() => User, (user) => user.spends)
  @JoinColumn({ name: "user_id" })
  user!: User;  
}                                                                                                                                                                                                                                                                                                                                                                               
