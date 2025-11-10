import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn  } from "typeorm";

@Entity("posts11")   
export class Post {

  @PrimaryGeneratedColumn()
  id!: number;

   @Column({ name: "name" })
  name!: string;

  @Column({ name: "email" })
  email!: string;

 



 


}       