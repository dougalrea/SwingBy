import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDB.js'
import FictionalPrimate from '../models/fictionalPrimate.js'
import User from '../models/user.js'
import primateData from './data/primates.js'
import userData from './data/users.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('🤖 Database has connected')

    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database dropped')

    const users = await User.create(userData)

    console.log((`🤖 ${users.length} users created`))

    const primateDataWithOwners = primateData.map(primate => {
      primate.owner = users[0]._id
      return primate
    })

    const fictionalPrimates = await FictionalPrimate.create(primateDataWithOwners)

    console.log(`🤖 ${fictionalPrimates.length} primates created`)

    await mongoose.connection.close()

    console.log('🤖 Goodbye')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)

    await mongoose.connection.close()
    console.log('🤖 Goodbye')
  }
}

seedDatabase()