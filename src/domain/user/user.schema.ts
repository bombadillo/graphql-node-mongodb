import User from './user.model';

import Workspace from '../workspace/workspace.model';

export const userTypeDefs = `
 
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String
    workspaceId: String,
    workspace: Workspace
  }

  input UserFilterInput {
    limit: Int
  }

  # Extending the root Query type.
  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
  }

  # We do not need to check if any of the input parameters
  # exist with a "!" character. This is because mongoose will
  # do this for us, and it also means we can use the same
  # input on both the "addUser" and "editUser" methods.
  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String,
    workspaceId: String
  }
  
  # Extending the root Mutation type.
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;

export const userResolvers = {
  Query: {
    users: async (_, { filter = {} }) => {
      const users: any[] = await User.find({}, null, filter);
      return users.map(user => user.toGraph());
    },
    user: async (_, { id }) => {
      const user: any = await User.findById(id);
      return user.toGraph();
    }
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const user: any = await User.create(input);
      return user.toGraph();
    },
    editUser: async (_, { id, input }) => {
      const user: any = await User.findByIdAndUpdate(id, input, {
        new: true
      });

      return user.toGraph();
    },
    deleteUser: async (_, { id }) => {
      const user: any = await User.findByIdAndRemove(id);
      return user ? user.toGraph() : null;
    }
  },
  User: {
    async workspace(user: { workspaceId: String }) {
      if (user.workspaceId) {
        const workspace: any = await Workspace.findById(user.workspaceId);
        return workspace.toGraph();
      }
    }
  }
};
