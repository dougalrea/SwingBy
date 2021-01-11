import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const eventsSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 25 },
  imageURL: { type: String, required: false },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  startDateTime: { type: String, required: true },
  duration: { type: Number, required: false },
  types: [{ type: String }],
  description: { type: String, required: false, maxlength: 500 },
  capacity: { type: Number, required: true },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: false  },
  comments: [commentSchema]
})

eventsSchema.virtual('hasExpired').get(function () {
  return new Date(this.startDateTime).getTime() < new Date().getTime()
})

eventsSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.id
    return json
  }
})

eventsSchema.plugin(uniqueValidator)

export default mongoose.model('Event', eventsSchema, 'EventComment', commentSchema)