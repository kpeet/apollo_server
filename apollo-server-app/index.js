import { ApolloServer } from 'apollo-server';
import  {
  RefreshTokenMiddleware,
  setHeadersResponseMiddleware
} from './src/middlewares/AuthTokenHandlerMiddleware';
import dotenv from 'dotenv';
dotenv.config();

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
  context: ({ req , res }) => { /* middleware before request */
    return RefreshTokenMiddleware(req);
  },
  formatResponse: (response, context) => { /* middleware after request */
    return setHeadersResponseMiddleware(context, response);
  }
});

//Run Apollo Server
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
