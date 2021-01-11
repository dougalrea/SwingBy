import mongoose from 'mongoose'
import connectToDatabase from '../lib/connectToDB.js'
import Event from '../models/event.js'
import eventSeeds from './data/eventSeeds.js'
import eventCommentSeeds from './data/eventCommentSeeds.js'
import User from '../models/user.js'
import userSeeds from './data/userSeeds.js'
import userReviewSeeds from './data/userReviewSeeds.js'
// import user from '../models/user.js'

async function seedDatabase() {
  try {
    await connectToDatabase()
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped')

    const users = await User.create(userSeeds)
    console.log(users.length, 'users created')

    const eventSeedsWithOwnersAndAttendees = eventSeeds.map(event => {
      event.owner = users[Math.floor(Math.random() * users.length)]._id
      event.attendees.push(event.owner)
      for (let i = 0; i < Math.ceil(event.capacity - (2 * Math.random() * event.capacity / 3) - 1); i++) {
        const potentialNewUser = users[Math.floor(Math.random() * users.length)]
        if (!event.attendees.some(attendee => attendee === potentialNewUser)) {
          event.attendees.push(potentialNewUser)
        } else i--
        console.log(event.attendees.length)
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
    console.log(events.length, 'events and', eventCommentsWithOwners.length, 'comments created')

    const userReviewsWithOwners = userReviewSeeds.map(userReview => {
      userReview.owner = users[Math.floor(Math.random() * users.length)]._id
      return userReview
    })

    for (let i = 0; i < 200; i++) {
      const review = userReviewsWithOwners[i]
      const owner = users.find(user => {
        return user._id === review.owner
      })
      const potentialEvents = events.filter(event => {
        return event.attendees.includes(owner._id)
      })
      const event = potentialEvents[Math.floor(Math.random() * potentialEvents.length)]
      if (!event) {
        return
      }
      const potentialReviewees = event.attendees.filter(attendee => {
        return attendee !== owner._id
      })
      const revieweeId = potentialReviewees[Math.floor(Math.random() * potentialReviewees.length)]
      const reviewee = users.find(user => {
        return user._id === revieweeId
      })

      reviewee.reviews.push(review)
      await reviewee.save()
      console.log('saved one review')
    }

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