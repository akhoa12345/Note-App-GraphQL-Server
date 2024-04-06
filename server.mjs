import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import 'dotenv/config'
import mongoose from 'mongoose'
import { getAuth } from 'firebase-admin/auth'
import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

// import fakeData from './fakeData/index.js'
import { typeDefs } from './schemas/index.js'
import { resolvers } from './resolvers/index.js'
import './firebaseConfig.js'

const app = express()
const httpServer = http.createServer(app)

// Connect to DB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8awrf6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const PORT = process.env.PORT || 4000

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ]
})

try {
  await server.start()

  const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization 
    
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(' ')[1]

      getAuth().verifyIdToken(accessToken)
        .then(decodedToken => {
          res.locals.uid = decodedToken.uid
          next()
        })
        .catch(err => {
          console.log({err})
          return res.status(403).json({message: 'Forbidden', error: err})
        })
    } else {
      next()
      // return res.status(401).json({message: 'Unauthorized'})
    }
  }

  app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {uid: res.locals.uid}
    }
  }))

  await mongoose.connect(uri)
  console.log('You successfully connected to MongoDB!!!')

  await new Promise((resolve) => httpServer.listen({port: PORT}, resolve))
  console.log('🚀 Server ready at http://localhost:4000')
} catch (error) {
  console.log('error: ', error)
}
