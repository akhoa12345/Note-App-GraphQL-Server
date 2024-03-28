import mongoose from 'mongoose'

const { Schema } = mongoose

const authorSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

const AuthorModel = mongoose.model('Author', authorSchema);
export default AuthorModel
