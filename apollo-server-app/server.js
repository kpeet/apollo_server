// server.js

import { ApolloServer } from 'apollo-server-lambda';
import  {
  RefreshTokenMiddleware,
  setHeadersResponseMiddleware
} from './src/middlewares/AuthTokenHandlerMiddleware';

/* Here get yours class and functions from controllers */
import  {
  SrmAUTH,
  AuthResolver,
  AuthSchema,
} from './src/controllers/AuthController';
import  {
  SrmAPI,
  TestResolver,
  TestSchema,
} from './src/controllers/TestController';

/* Instance Apollo Server */
const server = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs: [  /* Here subscribe yours schemas */
    AuthSchema,
    TestSchema,
  ],
  resolvers: [ /* Here subscribe yours resolvers mehtods */
    AuthResolver,
    TestResolver,
  ],
  dataSources: () => ({ /* Here subscribe yours dataSources */
   SrmAUTH: new SrmAUTH(),
   SrmAPI: new SrmAPI(),
  }),
  context: async({ event, context }) => {
    //Add middleware to context
    const extra = await RefreshTokenMiddleware(event);
    context = { ...context, extra };
    return {
      functionName: context.functionName,
      context,
      extra
    };
  },
  formatResponse: (response, context) => { /* middleware after request */
    return setHeadersResponseMiddleware(context, response);
  }
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    'preflightContinue': false
  },
});
