import "reflect-metadata"
import { DataSource } from "typeorm";
import {User} from './entity/User';
import * as dotenv from "dotenv"
dotenv.config();  
export const AppDataSource = new DataSource({
  type: "mysql", 
  host: process.env.HOST,
  port: 3306,
  username: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  entities: [User],
  // migrations:['src/migration'],
  synchronize: false,
  migrations:["src/migration*.ts"], 
  logging: true,

});
