import fakeData from '../fakeData/index.js'
import FolderModel from '../models/FolderModel.js'

export const resolvers = {
  Query: {
    folders: async () => { 
      const folders = await FolderModel.find()
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
    }
  }
}
