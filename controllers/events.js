import Event from '../models/event.js'

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
    const newEventData = { ...req.body }
    const newEvent = await Event.create(newEventData)
    return res.status(201).json(newEvent)
  } catch (err) {
    next(err)
  }
}

export default {
  index: eventsIndex,
  create: eventsCreate,
}