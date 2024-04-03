import fakeData from '../fakeData/index.js'
import FolderModel from '../models/FolderModel.js'
import AuthorModel from '../models/AuthorModel.js'
import NoteModel from '../models/NoteModel.js'

export const resolvers = {
  Query: {
    folders: async (parent, args, context, info) => { 
      const folders = await FolderModel.find({
        authorId: context.uid
      }).sort({
        updatedAt: 'desc'
      })
      console.log({context})
      return folders
    },
    folder: async (parent, args) => {
      const folderId = args.folderId
      const foundFolder = await FolderModel.findOne({
        _id: folderId
      })
      return foundFolder
    },
    note: async (parent, args) => {
      const noteId = args.noteId
      const foundNote = await NoteModel.findOne({
        _id: noteId
      })
      return foundNote
    }
  },
  Folder: {
    author: async (parent, args, context, info) => { 
      const authorId = parent.authorId
      const author = await AuthorModel.findOne({ uid: authorId })
      return author
    },
    notes: async (parent, args, context, info) => {
      const notes = await NoteModel.find({ folderId: parent._id })
      return notes
    }
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = await FolderModel.create({name: args.name, authorId: context.uid})
      return newFolder
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid })

      if (!foundUser) {
        const newUser = await AuthorModel.create({ uid: args.uid, name: args.name })
        return newUser
      }

      return foundUser
    },
    addNote: async (parent, args, context) => {
      const newNote = await NoteModel.create(args)
      return newNote
    }
  }
}
