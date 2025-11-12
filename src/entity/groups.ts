// import{Entity,PrimaryGeneratedColumn,Column,ManyToMany,JoinTable} from 'typeorm'
// import {User} from './User'

// @Entity("groups")
// export class Group{
// @PrimaryGeneratedColumn()
// id!:number

// @Column ({ name: "group_name" })
// group_name!:String

//  @Column({ nullable: true })
//   description?: string;

//   @ManyToMany(() => User, (user) => user.groups)
//   users!: User[];
// }