import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { constants } from './constants.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use('/api/graphql', expressMiddleware(server, {
  cors: false,
}));

app.listen({ port: constants.port }, () => {
  console.log(`Server running on port: ${constants.port}`);
});