import fakeData from '../fakeData/index.js'
import FolderModel from '../models/FolderModel.js'
import AuthorModel from '../models/AuthorModel.js'

export const resolvers = {
  Query: {
    folders: async (parent, args, context, info) => { 
      const folders = await FolderModel.find({
        authorId: context.uid
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
    author: (parent, args, context, info) => { 
      const authorId = parent.authorId
      return fakeData.authors.find(author => author.id === authorId)
    },
    notes: (parent, args, context, info) => {
      return fakeData.notes.filter(note => note.folderId === parent.id)
    }
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = await FolderModel.create({name: args.name, authorId: 1})
      return newFolder
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.find({ uid: args.uid })

      if (!foundUser) {
        const newUser = await AuthorModel.create(args)
        return newUser
      }

      return foundUser
    }
  }
}
