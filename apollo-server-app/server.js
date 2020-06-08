// server.js

const { ApolloServer } = require('apollo-server-lambda');

import  {
  SrmAPI,
  AuthResolver,
  AuthSchema,
} from './src/controllers/AuthController';
/* Instance Apollo Server */
const server = new ApolloServer({
  typeDefs: [  /* Here subscribe yours schemas */
    AuthSchema,
  ],
  resolvers: [ /* Here subscribe yours resolvers mehtods */
    AuthResolver,
  ],
  dataSources: () => ({ /* Here subscribe yours dataSources */
   SrmAPI: new SrmAPI(),
  }),
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});