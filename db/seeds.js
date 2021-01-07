import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDB.js'
import Event from '../models/event.js'
import eventSeeds from './data/eventSeeds.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('Database dropped')

    const events = await Event.create(eventSeeds)

    console.log(events.length, ' events created')

    await mongoose.connection.close()

    console.log('Bye!')

  } catch (err) {
    console.log('Something went wrong with seeding')
    console.log(err)

    await mongoose.connection.close()
    console.log('Bye!')
  }
}

seedDatabase()