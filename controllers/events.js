import Event from '../models/event.js'
import { notFound, forbidden } from '../lib/errorHandler.js'

async function eventsIndex(_req, res, next){
  try {
    const events = await Event.find()
    return res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function eventsCreate(req, res, next) {
  try {
    const newEventData = { ...req.body, owner: req.currentUser._id }
    const newEvent = await Event.create(newEventData)
    return res.status(201).json(newEvent)
  } catch (err) {
    next(err)
  }
}

async function eventShowOne(req, res, next) {
  const { id } = req.params
  try {
    const event = await Event.findById(id).populate('owner')
    if (!event) throw new Error(notFound)
    return res.status(200).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventDelete(req, res, next) {
  const { id } = req.params
  try {
    const eventToDelete = await Event.findById(id)
    if (!eventToDelete) throw new Error(notFound)
    if (!eventToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    await eventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function eventUpdate(req, res, next){
  const { id } = req.params
  try {
    const eventToUpdate = await Event.findById(id)
    if (!eventToUpdate) throw new Error(notFound)
    Object.assign(eventToUpdate, req.body)
    await eventToUpdate.save()
    return res.status(202).json(eventToUpdate)
  } catch (err) {
    next(err)
  }
}

async function eventAttend(req, res, next) {
  const { id } = req.params
  try {
    const eventToAttend = await Event.findById(id)
    eventToAttend.attendees.push(req.currentUser._id)
    await eventToAttend.save()
    return res.status(202).json(eventToAttend)
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

async function eventCommentDelete(req, res, next) {
  const { id , commentId } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    const commentToDelete = event.comments.id(commentId) 
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    await commentToDelete.remove()
    await event.save()
    return res.sendStatus(204).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventEditComment(req, res, next) {
  const { id, commentId } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    const commentToEdit = event.comments.id(commentId)
    if (!commentToEdit) throw new Error(notFound)
    if (!commentToEdit.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    Object.assign(commentToEdit, req.body)
    await event.save()
    return res.status(202).json(event)
  } catch (err) {
    next(err)
  }
}

export default {
  index: eventsIndex,
  create: eventsCreate,
  show: eventShowOne,
  update: eventUpdate,
  delete: eventDelete,
  attend: eventAttend,
  createComment: eventCommentCreate,
  deleteComment: eventCommentDelete,
  editComment: eventEditComment
}