import resolvers from './../resolvers/AuthResolver';
import  typeDefs from '../typeDefs/AuthSchema';
import SrmAPI from '../models/ApiSrmModel';

export {
  SrmAPI,
  resolvers as AuthResolver,
  typeDefs as AuthSchema
};
