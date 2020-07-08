// server.js

import { ApolloServer } from "apollo-server-lambda";
import {
  RefreshTokenMiddleware,
  setHeadersResponseMiddleware,
  getKimchiToken
} from "./src/middlewares/AuthTokenHandlerMiddleware";

/* Here get yours class and functions from controllers */
import {
  SrmAUTH,
  AuthResolver,
  AuthSchema
} from "./src/controllers/AuthController";
import {
  SrmAPI,
  ResgitryKimchiApi,
  BankingKimchiApi,
  TestResolver,
  TestSchema
} from "./src/controllers/ApiSrmController";

/* Instance Apollo Server */
const server = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs: [
    /* Here subscribe yours schemas */
    AuthSchema,
    TestSchema
  ],
  resolvers: [
    /* Here subscribe yours resolvers mehtods */
    AuthResolver,
    TestResolver
  ],
  dataSources: () => ({
    /* Here subscribe yours dataSources */
    SrmAUTH: new SrmAUTH(),
    SrmAPI: new SrmAPI(),
    RegistryKimchiApi: new ResgitryKimchiApi(),
    BankingKimchiApi: new BankingKimchiApi()
  }),
  context: async ({ event, context }) => {
    // Add middleware to context
    const extra = await RefreshTokenMiddleware(event);
    context = { ...context, extra };

    const extrakimchi = await getKimchiToken();

    return {
      functionName: context.functionName,
      context,
      extra,
      extrakimchi
    };
  },
  formatResponse: (response, context /* middleware after request */) =>
    setHeadersResponseMiddleware(context, response)
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    preflightContinue: false
  }
});
