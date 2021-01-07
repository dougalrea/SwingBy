import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export default function connectToDatabase() {
  const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
  }
  console.log('database connected')
    
  return mongoose.connect(dbURI, options)
}