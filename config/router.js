import express from 'express'

import auth from '../controllers/auth.js'
import events from '../controllers/events.js'
import users from '../controllers/people.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/events/:id/comments')
  .post(secureRoute, events.createComment)

router.route('/people')
  .get(users.index)

router.route('/people/:id')
  .get(users.show)

router.route('/people/:id/reviews')
  .post(secureRoute, users.createReview)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

export default router