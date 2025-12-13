import dotenv from 'dotenv'

dotenv.config()

export default {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://muharits:640559@localhost:5432/library_db',
} as const