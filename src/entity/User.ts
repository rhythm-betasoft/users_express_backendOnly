import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
  bloodGroup!: string;

  @Column({ name: "religion" })
  religion!: string;

  @Column({ name: "age" })
  age!: number;

  @Column({ name: "role" })
  role!: string;
}
