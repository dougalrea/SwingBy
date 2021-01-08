import Event from '../models/event.js'
import User from '../models/user.js'

import { notFound } from '../lib/errorHandler.js'

async function eventsIndex(_req, res, next){
  try {
    const events = await Event.find().populate('owner')
    return res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function eventsCreate(req, res, next) {
  try {
    const newEventData = { ...req.body, owner: req.currentUser._id }
    const creator = await User.findById(req.currentUser._id)
    console.log(creator)
    const newEvent = await Event.create(newEventData)
    creator.events.push(newEvent)
    await creator.save()
    return res.status(201).json(newEvent)
  } catch (err) {
    next(err)
  }
}

async function eventCommentCreate(req, res, next) {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    const newComment = { ...req.body, owner: req.currentUser._id }
    event.comments.push(newComment)
    await event.save()
    return res.status(201).json(event)
  } catch (err) {
    next(err)
  }
}

// async function filmCommentDelete(req, res, next) {
//   const { id, commentId } = req.params
//   try {
//     const film = await Film.findById(id)
//     if (!film) throw new Error(notFound)
//     const commentToDelete = film.comments.id(commentId)
//     if (!commentToDelete) throw new Error(notFound)
//     if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
//     await commentToDelete.remove()
//     await film.save()
//     return res.sendStatus(204)
//   } catch (err) {
//     next(err)
//   }
// }

export default {
  index: eventsIndex,
  create: eventsCreate,
  createComment: eventCommentCreate
}