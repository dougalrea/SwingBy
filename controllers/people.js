import User from '../models/user.js'
import { notFound, forbidden } from '../lib/errorHandler.js'

async function peopleShowAll(req, res, next) {
  try {
    const people = await User.find().populate('events')
    return res.status(200).json(people)
  } catch (err) {
    next(err)
  }
}

async function personShowOne(req, res, next) {
  const { id } = req.params
  try {
    const person = await User.findById(id).populate('events')
    if (!person) throw new Error(notFound)
    return res.status(200).json(person)
  } catch (err) {
    next(err)
  }
}

async function personDelete(req, res, next) {
  const { id } = req.params
  try {
    const personToDelete = await User.findById(id)
    if (!personToDelete) throw new Error(notFound)
    await personToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function personUpdate(req, res, next){
  const { id } = req.params
  try {
    const personToUpdate = await User.findById(id)
    if (!personToUpdate) throw new Error(notFound)
    Object.assign(personToUpdate, req.body)
    await personToUpdate.save()
    return res.status(202).json(personToUpdate)
  } catch (err) {
    next(err)
  }
}

async function personCreateReview(req, res, next) {
  const { id } = req.params
  try {
    const person = await User.findById(id)
    if (!person) throw new Error(notFound)
    const newReview = { ...req.body, owner: req.currentUser._id }
    person.reviews.push(newReview)
    await person.save()
    return res.status(201).json(person)
  } catch (err) {
    next(err)
  }
}

//Needs looking at as getting message not found in insomina when testing
async function personDeleteReview(req, res, next) {
  const { id, reviewId } = req.params
  try {
    const person = await User.findById(id)
    if (!person) throw new Error(notFound)
    const reviewToDelete = person.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error(notFound)
    if (!reviewToDelete.owner.equals(req. currentUser._id)) throw new Error(forbidden)
    await reviewToDelete.remove()
    await person.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  index: peopleShowAll,
  show: personShowOne,
  update: personUpdate,
  delete: personDelete,
  createReview: personCreateReview,
  deleteReview: personDeleteReview,
}