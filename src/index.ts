import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import * as mongoose from 'mongoose';
import { merge } from 'lodash';

import { userResolvers, userTypeDefs } from './domain/user/user.schema';
import {
  workspaceResolvers,
  workspaceTypeDefs
} from './domain/workspace/workspace.schema';

const MONGODB_URI = 'mongodb://localhost/graphql-demo';

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers)
});

const server = new ApolloServer({
  schema,
  formatError(error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(error);
    }

    return error;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
