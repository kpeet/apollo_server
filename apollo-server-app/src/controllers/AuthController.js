import resolvers from './../resolvers/AuthResolver';
import  typeDefs from '../typeDefs/AuthSchema';
import SrmAUTH from '../models/AuthSrmModel';

export {
  SrmAUTH,
  resolvers as AuthResolver,
  typeDefs as AuthSchema
};
