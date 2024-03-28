import mongoose from 'mongoose'

const { Schema } = mongoose

const noteSchema = new Schema({
  content: {
    type: String
  },
  folderId: {
    type: String,
    required: true
  }
}, { timestamps: true })

const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel
