import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDB.js'
import Event from '../models/event.js'
import eventSeeds from './data/eventSeeds.js'
import User from '../models/user.js'
import userSeeds from './data/userSeeds.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('Database dropped')

    const users = await User.create(userSeeds)

    console.log(users.length, ' users created')

    const eventSeedsWithOwners = eventSeeds.map(event => {
      event.owner = users[Math.floor(Math.random() * users.length)]._id
      return event
    })

    const events = await Event.create(eventSeedsWithOwners)

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