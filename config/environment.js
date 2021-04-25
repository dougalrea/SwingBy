import dotenv from 'dotenv'
dotenv.config()

export const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/swingby'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'Im obsessed with Taylor Swift'