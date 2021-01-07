async function peopleShowAll() {
  console.log('show all people')
}

async function peopleAddNew(req, res, next) {
  try {
    const newUserData = { ...req.body, owner: req.currentUser._id }
    const newUser = await newUser.create(newUserData)
    return res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
}

export default {
  index: peopleShowAll,
  signUp: peopleAddNew
}