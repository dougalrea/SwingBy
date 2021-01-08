import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userRatingsSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 65 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  mutualEvent: { type: mongoose.Schema.ObjectId, ref: 'Event', required: true }
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  alias: { type: String },
  profilePicture: { type: String },
  age: { type: Number },
  sex: { type: String },
  sexualOrientation: { type: String },
  height: { type: String },
  politics: { type: String },
  isOpenToDrugs: { type: Boolean },
  smoker: { type: Boolean },
  interests: [{ type: String }],
  foodPreferences: [{ type: String }],
  events: { type: mongoose.Schema.ObjectId, ref: 'Event' },
  ratings: [userRatingsSchema]
})


userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.pre('validate', function(next) {
  if (this.isModified('password') && this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'does not match')
  }
  next()
})

userSchema.virtual('avgRating').get(function () {
  if (!this.ratings.length) return 'Not Rated Yet'

  const avg = this.ratings.reduce((sum, curr) => {
    return sum + curr.rating
  }, 0)
  return Math.round(avg / this.ratings.length)
})

userSchema.set('toJSON', { virtuals: true })

userSchema.plugin(uniqueValidator)


export default mongoose.model('User', userSchema)

