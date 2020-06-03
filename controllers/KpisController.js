import FinancingAPI from "../models/ApiFinancingModel";
import LoanAPI from "../models/ApiLoanModel";
import resolvers  from "../resolvers/KpisResolver";
import typeDef from "../typeDefs/KpisTypeDef";

export  {
  FinancingAPI,
  LoanAPI,
  resolvers as KpisResolver,
  typeDef as KpisSchema
};
