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
    const event = await Event.findById(id)
      .populate('owner')
      .populate('attendees')
    if (!event) throw new Error(notFound)
    return res.status(200).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventEdit(req, res, next){
  const { id } = req.params
  try {
    const eventToEdit = await Event.findById(id)
    if (!eventToEdit) throw new Error(notFound)
    if (!eventToEdit.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    Object.assign(eventToEdit, req.body)
    await eventToEdit.save()
    return res.status(202).json(eventToEdit)
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

async function eventCommentEdit(req, res, next) {
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

async function eventCreateRequest(req, res, next) {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    event.attendeeRequests.addToSet(req.currentUser._id)
    await event.save()
    return res.status(202).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventDeleteRequest(req, res, next) {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    event.attendeeRequests.pull(req.currentUser._id)
    await event.save()
    return res.status(202).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventAcceptRequest(req, res, next) {
  const { id, personId } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    if (!event.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    event.attendeeRequests.pull(personId)
    event.attendees.addToSet(personId)
    await event.save()
    return res.status(202).json(event)
  } catch (err) {
    next(err)
  }
}

async function eventDeleteAttendee(req, res, next) {
  const { id, personId } = req.params
  try {
    const event = await Event.findById(id)
    if (!event) throw new Error(notFound)
    if (!event.owner.equals(req.currentUser._id) === !req.currentUser._id.equals(personId)) {
      throw new Error(forbidden)
    }
    event.attendees.pull(personId)
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
  edit: eventEdit,
  delete: eventDelete,
  createComment: eventCommentCreate,
  deleteComment: eventCommentDelete,
  editComment: eventCommentEdit,
  createRequest: eventCreateRequest,
  deleteRequest: eventDeleteRequest,
  acceptRequest: eventAcceptRequest,
  deleteAttendee: eventDeleteAttendee,
}