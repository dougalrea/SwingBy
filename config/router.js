import express from 'express'

import events from '../controllers/events.js'
import users from '../controllers/people.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(events.create)

router.route('/login')
  .post(users.register)


export default router