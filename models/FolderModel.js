import mongoose from 'mongoose'

const { Schema } = mongoose

const folderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  }
}, { timestamps: true })

const FolderModel = mongoose.model('Folder', folderSchema);
export default FolderModel
