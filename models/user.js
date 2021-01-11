import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const userReviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 150 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  // mutualEvent: { type: mongoose.Schema.ObjectId, ref: 'Event', required: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  alias: { type: String },
  profilePicture: { type: String },
  age: { type: Number },
  gender: { type: String },
  sexualOrientation: { type: String },
  height: { type: String },
  politics: { type: String },
  isOpenToDrugs: { type: Boolean },
  isSmoker: { type: Boolean },
  interests: [{ type: String }],
  foodPreferences: { type: String },
  reviews: [userReviewSchema],
})

userSchema.virtual('eventsHostOf', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.virtual('eventsAttendeeOf', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'attendees'
})

userSchema.virtual('avgRating').get(function () {
  if (!this.reviews.length) return 'Not Rated Yet'
  const avg = this.reviews.reduce((sum, curr) => sum + curr.rating, 0)
  return avg / this.reviews.length
})

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.pre('validate', function(next) {
  if (this.isModified('password') && this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Password does not match')
  }
  next()
})

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    delete json.id
    return json
  },
})

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)