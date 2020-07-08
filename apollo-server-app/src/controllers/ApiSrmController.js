import resolvers from "../resolvers/ApiSrmResolver";
import apiSrmType from "../typeDefs/ApiSrmSchema";
import SrmAPI from "../models/ApiSrmModel";
import ResgitryKimchiApi from "../models/ApiRegistryModel";
import BankingKimchiApi from "../models/ApiBankModel";

export {
  SrmAPI,
  ResgitryKimchiApi,
  BankingKimchiApi,
  resolvers as TestResolver,
  apiSrmType as TestSchema
};
