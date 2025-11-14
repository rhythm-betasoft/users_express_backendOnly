import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from './User';
import { Comment } from './Comment';  

@Entity("announcements")
export class Announcement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.announcements)
  author!: User;
  
  @OneToMany(() => Comment, (comment) => comment.announcement, { cascade: true })
  comments!: Comment[];
}
