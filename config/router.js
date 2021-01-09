import e from 'express'
import express from 'express'

import auth from '../controllers/auth.js'
import events from '../controllers/events.js'
import users from '../controllers/people.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)
  
router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete)

router.route('/events/:id/comments')
  .post(secureRoute, events.createComment)
  .delete(secureRoute, events.delete)

router.route('/people')
  .get(users.index)

router.route('/people/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete)

// user reviews: DELETE
router.route('/people/:id/reviews')
  .post(secureRoute, users.createReview)
  .delete(secureRoute, users.deleteReview)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

export default router