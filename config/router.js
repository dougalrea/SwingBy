import express from 'express'

import events from '../controllers/events.js'
import users from '../controllers/people.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)
  
router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete)

router.route('/events/:id/attend')
  .post(secureRoute, events.attend)

router.route('/events/:id/comments')
  .post(secureRoute, events.createComment)

router.route('/events/:id/comments/:commentId')
  .delete(secureRoute, events.deleteComment)
  .put(secureRoute, events.editComment)

router.route('/people')
  .get(users.index)

router.route('/people/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete)

router.route('/people/:id/reviews')
  .post(secureRoute, users.createReview)

router.route('/people/:id/reviews/:reviewId')
  .delete(secureRoute, users.deleteReview)
  .put(secureRoute, users.editReview)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

export default router