import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDB.js'
import Event from '../models/event.js'
import eventSeeds from './data/eventSeeds.js'
import User from '../models/user.js'
import userSeeds from './data/userSeeds.js'
import eventCommentSeeds from './data/eventCommentSeeds.js'


async function seedDatabase() {
  try {
    await connectToDatabase()

    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()

    console.log('Database dropped')

    const users = await User.create(userSeeds)

    console.log(users.length, ' users created')

    const eventSeedsWithOwnersAndAttendees = eventSeeds.map(event => {
      event.owner = users[Math.floor(Math.random() * users.length)]._id
      event.attendees.push(event.owner)
      for (let i = 0; i < (event.maxCapacity - (2 * Math.random() * event.maxCapacity / 3) - 1); i++) {
        const potentialNewUser = users[Math.floor(Math.random() * users.length)]
        if (!event.attendees.some(attendee => attendee === potentialNewUser)) {
          event.attendees.push(potentialNewUser)
        } else {
          i--
        }
      }
      return event
    })

    const eventCommentsWithOwners = eventCommentSeeds.map(eventComment => {
      eventComment.owner = users[Math.floor(Math.random() * users.length)]._id
      return eventComment
    })

    eventCommentsWithOwners.forEach(comment => {
      eventSeedsWithOwnersAndAttendees[Math.floor(Math.random() * eventSeedsWithOwnersAndAttendees.length)].comments.push(comment)
    })

    const events = await Event.create(eventSeedsWithOwnersAndAttendees)

    console.log(events.length, ' events created and ', eventCommentsWithOwners.length, ' comments created')

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