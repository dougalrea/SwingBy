import User from '../models/user.js'

async function peopleAddNew(req, res, next) {
  try {
    const newUserData = { ...req.body }
    const newUser = await User.create(newUserData)
    return res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
}

export default {
  // index: peopleShowAll,
  register: peopleAddNew
}