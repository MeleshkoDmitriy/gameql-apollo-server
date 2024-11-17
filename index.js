import { ApolloServer } from '@apollo/server';
import { createHandler } from '@apollo/server/micro';
import { microCors } from 'micro-cors';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const cors = microCors();
  const handler = createHandler({ apolloServer: server });

  return cors(handler);
};

export default startServer;