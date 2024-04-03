import fakeData from '../fakeData/index.js'
import FolderModel from '../models/FolderModel.js'
import AuthorModel from '../models/AuthorModel.js'

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
    note: (parent, args) => {
      const noteId = args.noteId
      return fakeData.notes.find(note => note.id === noteId)
    }
  },
  Folder: {
    author: async (parent, args, context, info) => { 
      const authorId = parent.authorId
      const author = await AuthorModel.findOne({ uid: authorId })
      return author
    },
    notes: (parent, args, context, info) => {
      return fakeData.notes.filter(note => note.folderId === parent.id)
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
    }
  }
}
