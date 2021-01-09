import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const userReviewsSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 65 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  mutualEvent: { type: mongoose.Schema.ObjectId, ref: 'Event', required: false },
}, {
  timestamps: true,
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
  events: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }],
  reviews: [userReviewsSchema],
})

// userSchema.virtual('events', {
//   ref: 'Event',
//   localField: '_id',
//   foreignField: 'owner'
// })

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

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.virtual('avgRating').get(function () {
  if (!this.reviews.length) return 'Not Rated Yet'

  const avg = this.reviews.reduce((sum, curr) => {
    return sum + curr.rating
  }, 0)
  return avg / this.reviews.length
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.id
    return json
  },
})

userSchema.plugin(uniqueValidator)


export default mongoose.model('User', userSchema)