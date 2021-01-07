import express from 'express'
import { port } from './config/environment.js'
import connectToDatabase from './lib/connectToDB.js'
import logger from './logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'
const app = express()


export default async function startServer() {
  try {
    await connectToDatabase()

    console.log('🤖 Database has connected')

    app.use(express.json())

    app.use(logger)

    app.use('/api', router)

    app.use(errorHandler)

    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}

startServer()