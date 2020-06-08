import { gql } from "apollo-server";
//Schema
const typeDefs = gql`
  type User{
    id: ID
    first_name: String
    last_name: String
    email: String
    created: String
  }
  type Token{
    refresh: String
    access: String
  }
  input UserInput {
    first_name: String!
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
`;

export default typeDefs;
