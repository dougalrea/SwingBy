import mongoose from 'mongoose'

const eventsSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 25 },
  imageURL: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  types: [{ type: String }],
  description: { type: String, required: true, maxlength: 500 },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
})

const today = new Date()
console.log(today.toLocaleDateString(''))

export default mongoose.model('Event', eventsSchema)