import { gql } from "apollo-server";
//Schema
const typeDefs = gql`
  type User{
    id: ID
    name: String
    last_name: String
    email: String
    created: String
  }
  type Token{
    refresh: String
    access: String
  }
  input UserInput {
    name: String!
    last_name: String!
    email: String!
    password: String!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  type Mutation {
    registerUser(input: UserInput): User
    loginUser(input: AuthInput): Token
  }
  type Query{
    getUser(token:String!): User
  }
`;

export default typeDefs;
