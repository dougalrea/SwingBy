import mongoose from 'mongoose'

import connectToDatabase from '../lib/connectToDB.js'
import Event from '../models/event.js'
import eventData from './data/eventData.js'
import eventCommentData from './data/eventCommentData.js'
import User from '../models/user.js'
import userData from './data/userData.js'
import userReviewData from './data/userReviewData.js'

function arrayItemAtRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)]
}

async function seedDatabase() {
  try {
    await connectToDatabase()
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped')

    const users = await User.create(userData)
    console.log(users.length, 'users created')

    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      const numberFollowedBy = Math.floor(Math.random() * 15) + 5
      for (let i = 0; i < numberFollowedBy; i++) {
        let potentialFollower = arrayItemAtRandomIndex(users)._id
        while (user.followedBy.includes(potentialFollower) || user._id === potentialFollower) {
          potentialFollower = arrayItemAtRandomIndex(users)._id
        }
        user.followedBy.push(potentialFollower)
      }
      await user.save()
    }

    const eventSeeds = eventData.map(event => {
      event.owner = arrayItemAtRandomIndex(users)._id
      event.attendees.push(event.owner)
      const numberOfAttendees = event.capacity === 2 ?
        1 : Math.floor((event.capacity / 3) + (2 * Math.random() * event.capacity / 3))
      for (let i = 0; i < numberOfAttendees; i++) {
        let potentialAttendee = arrayItemAtRandomIndex(users)._id
        while (event.attendees.includes(potentialAttendee)) {
          potentialAttendee = arrayItemAtRandomIndex(users)._id
        }
        event.attendees.push(potentialAttendee)
      }
      return event
    })

    const eventCommentSeeds = eventCommentData.map(comment => {
      comment.owner = arrayItemAtRandomIndex(users)._id
      return comment
    })

    eventCommentSeeds.forEach(comment => {
      arrayItemAtRandomIndex(eventSeeds).comments.push(comment)
    })

    const events = await Event.create(eventSeeds)
    console.log(events.length, 'events and', eventCommentSeeds.length, 'comments created')

    for (let i = 0; i < userReviewData.length; i++) {
      const review = userReviewData[i]
      let owner = arrayItemAtRandomIndex(users)
      let potentialEvents = events.filter(event => event.attendees.includes(owner._id))
      while (!potentialEvents.length) {
        owner = arrayItemAtRandomIndex(users)
        potentialEvents = events.filter(event => event.attendees.includes(owner._id))
      }
      const event = arrayItemAtRandomIndex(potentialEvents)
      const otherAttendees = event.attendees.filter(attendee => attendee !== owner._id)
      const revieweeId = arrayItemAtRandomIndex(otherAttendees)
      const reviewee = await User.findById(revieweeId)
      review.owner = owner._id
      reviewee.reviews.push(review)
      await reviewee.save()
      console.log('Saved user review number ', i)
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