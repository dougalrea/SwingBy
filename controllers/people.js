import User from '../models/user.js'
import { notFound, forbidden } from '../lib/errorHandler.js'

async function peopleShowAll(_req, res, next) {
  try {
    const people = await User.find()
      .populate('eventsHostOf')
      .populate('eventsAttendeeOf')
    return res.status(200).json(people)
  } catch (err) {
    next(err)
  }
}

async function personShowOne(req, res, next) {
  const { id } = req.params
  try {
    const person = await User.findById(id)
      .populate('eventsHostOf')
      .populate('eventsAttendeeOf')
      .populate('followedBy')
    if (!person) throw new Error(notFound)
    console.log(person)
    return res.status(200).json(person)
  } catch (err) {
    next(err)
  }
}

async function personEdit(req, res, next){
  const { id } = req.params
  try {
    const personToUpdate = await User.findById(id)
    if (!personToUpdate) throw new Error(notFound)
    if (!req.currentUser._id.equals(id)) throw new Error(forbidden)
    Object.assign(personToUpdate, req.body)
    await personToUpdate.save()
    return res.status(202).json(personToUpdate)
  } catch (err) {
    next(err)
  }
}

async function personDelete(req, res, next) {
  const { id } = req.params
  try {
    const personToDelete = await User.findById(id)
    if (!personToDelete) throw new Error(notFound)
    if (!req.currentUser._id.equals(id)) throw new Error(forbidden)
    await personToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function personCreateReview(req, res, next) {
  const { id } = req.params
  try {
    const person = await User.findById(id)
    if (!person) throw new Error(notFound)
    if (req.currentUser._id.equals(id)) throw new Error(forbidden)
    const newReview = { ...req.body, owner: req.currentUser._id }
    person.reviews.push(newReview)
    await person.save()
    return res.status(201).json(person)
  } catch (err) {
    next(err)
  }
}

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

async function personEditReview(req, res, next) {
  const { id, reviewId } = req.params
  try {
    const person = await User.findById(id)
    if (!person) throw new Error(notFound)
    const reviewToEdit = person.reviews.id(reviewId)
    if (!reviewToEdit) throw new Error(notFound)
    if (!reviewToEdit.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    Object.assign(reviewToEdit, req.body)
    await person.save()
    return res.status(202).json(person)
  } catch (err) {
    next(err)
  }
}

async function personFollow(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(req.currentUser._id)
    user.following.addToSet(id)
    await user.save()
    const person = await User.findById(id)
    return res.status(202).json(person)
  } catch (err) {
    next(err)
  }
}

async function personUnfollow(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(req.currentUser._id)
    user.following.pull(id)
    await user.save()
    const person = await User.findById(id)
    return res.status(202).json(person)
  } catch (err) {
    next(err)
  }
}

export default {
  index: peopleShowAll,
  show: personShowOne,
  edit: personEdit,
  delete: personDelete,
  createReview: personCreateReview,
  deleteReview: personDeleteReview,
  editReview: personEditReview,
  follow: personFollow,
  unfollow: personUnfollow
}