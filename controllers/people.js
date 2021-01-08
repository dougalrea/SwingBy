import User from '../models/user.js'
import { notFound } from '../lib/errorHandler.js'

async function peopleShowAll(req, res, next) {
  try {
    const people = await User.find().populate('events')
    return res.status(200).json(people)
  } catch (err) {
    next(err)
  }
}

async function peopleShowOne(req, res, next) {
  const { id } = req.params
  try {
    const person = await User.findById(id).populate('events')
    if (!person) throw new Error(notFound)
    return res.status(200).json(person)
  } catch (err) {
    next(err)
  }
}

async function personCreateReview(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) throw new Error(notFound)
    const newReview = { ...req.body, owner: req.currentUser._id }
    user.reviews.push(newReview)
    await user.save()
    return res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

export default {
  index: peopleShowAll,
  show: peopleShowOne,
  createReview: personCreateReview,
}