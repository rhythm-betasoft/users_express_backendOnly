import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToMany, JoinTable } from "typeorm";
import { Spend } from './Spend'
import {Announcement} from './Announcement'
// import {Group} from './groups'
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

  @Column({ default: false })
  pinned!: boolean;

  @Column({ nullable: true })
twoFactorSecret?: string;

@Column({ default: false })
flag!: boolean;

  @Column('json', { nullable: true })
  trustedDevices?: {
    deviceId: string;
    createdAt: Date;
    expiresAt: Date;
  }[];

  @OneToMany(() => Spend, (spend) => spend.user)
  spends!: Spend[];

  @OneToMany(() => Announcement, (announcement) => announcement.author)
announcements!: Announcement[];
  // @ManyToMany(()=>Group,(group)=>group.users)
  // @JoinTable()
  // groups!:Group[]
  
}
