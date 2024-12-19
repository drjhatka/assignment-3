import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join('./' + '.env') })
export const  config = {
    database_url : process.env.DB_URL,
    default_password : process.env.DEFAULT_PASSWORD,
    port:process.env.DB_PORT
}