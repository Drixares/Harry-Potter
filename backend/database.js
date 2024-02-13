import dotenv from 'dotenv';
import { createPool } from 'mysql2';
dotenv.config()

export const myPool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})