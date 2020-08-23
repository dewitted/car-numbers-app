import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Entry = new Schema({
  number: {
    type: String,
  },
  ownername: {
    type: String,
  },
})

export default mongoose.model('Entry', Entry)
