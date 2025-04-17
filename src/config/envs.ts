import "dotenv/config"

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
export const HOST = process.env.HOST || "localhost"
export const DBPORT = process.env.DBPORT ? parseInt(process.env.DBPORT) : 5432
export const USERNAME = process.env.USERNAME || "postgres"
export const PASSWORD = process.env.PASSWORD
export const DATABASE = process.env.DATABASE
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

