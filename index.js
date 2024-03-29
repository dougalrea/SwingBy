import express from 'express'
import { port } from './config/environment.js'

import connectToDatabase from './lib/connectToDB.js'
import logger from './logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'
import path from 'path'

const app = express()

const __dirname = path.resolve()


export default async function startServer() {
  try {
    await connectToDatabase()

    console.log('🤖 Database has connected')

    app.use(express.static(`${__dirname}/client/build`))

    app.use(express.json())

    app.use(logger)

    app.use('/api', router)

    app.use('/*', (_, res) => res.sendFile(`${__dirname}/client/build/index.html`))

    app.use(errorHandler)

    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}

startServer()