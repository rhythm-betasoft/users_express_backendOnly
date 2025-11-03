import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.SQL_PORT ? +process.env.SQL_PORT : 3306,
})
export default pool;