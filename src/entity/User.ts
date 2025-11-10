import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Spend} from './Spend'
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "password" })
  password!: string;

  @Column({ name: "gender" })
  gender!: string;

  @Column({ name: "blood_group" })
  blood_group!: string;

  @Column({ name: "religion" })
  religion!: string;

  @Column({ name: "age" })
  age!: number;

  @Column({ name: "role" })
  role!: string;
  @OneToMany(() => Spend, (spend) => spend.user)
spends!: Spend[];
}
