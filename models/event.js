import mongoose from 'mongoose'

const eventsSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 25 },
  location: { type: String, required: true }
})

export default mongoose.model('Event', eventsSchema)