import { ApolloServer } from 'apollo-server';
import  {
  RefreshTokenMiddleware,
  setHeadersResponseMiddleware
} from './src/middlewares/AuthTokenHandlerMiddleware';
import dotenv from 'dotenv';
dotenv.config();

/* Here get yours class and functions from controllers */
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
  context: ({ req , res }) => { /* middleware before request */
    return RefreshTokenMiddleware(req, res);
  },
  formatResponse: (response, context) => { /* middleware after request */
    setHeadersResponseMiddleware(context);
    return response;
  }
});

//Run Apollo Server
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
