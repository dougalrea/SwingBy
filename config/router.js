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
  .delete(secureRoute, events.delete)
  .put(secureRoute, events.update)


router.route('/events/:id/attend')
  .post(secureRoute, events.attend)


// event comments: DELETE
router.route('/events/:id/comments')
  .post(secureRoute, events.createComment)


router.route('/people')
  .get(users.index)

// EDIT, DELETE
router.route('/people/:id')
  .get(users.show)

// user reviews: DELETE
router.route('/people/:id/reviews')
  .post(secureRoute, users.createReview)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

export default router