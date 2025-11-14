import {Entity,PrimaryGeneratedColumn,Column,ManyToMany,CreateDateColumn, ManyToOne} from 'typeorm'
import {User} from './User'
import { Announcement } from "./Announcement";

@Entity("comments")
export class Comment{
    @PrimaryGeneratedColumn()
    id! :number;

    @Column()
    content! :string;

    @CreateDateColumn()
    createdAt! :Date;

    @ManyToOne(()=>User,user=>user.comments,{eager:true})   
    author!:User
    @ManyToOne(()=>Announcement,announcement=>announcement.comments,{onDelete:"CASCADE"})
    announcement!:Announcement


}
