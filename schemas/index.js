export const typeDefs = `#graphql
  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String!,
    content: String
  }

  type Author {
    uid: String!,
    name: String!,
  }

  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder,
    note(noteId: String): Note
  }

  type Mutation {
    addFolder(name: String!): Folder,
    register(uid: String!, name: String!): Author 
    addNote(content: String!, folderId: ID!): Note
  }
`
