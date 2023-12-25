import dotenv from 'dotenv'

dotenv.config()

export default {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: './db/migrations',
        },
        seeds: {
            directory: './seeds',
        }
    },
}