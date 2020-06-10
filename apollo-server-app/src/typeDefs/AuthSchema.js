import { gql } from "apollo-server-lambda";
//Schema
const typeDefs = gql`
  type UserResponse{
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
  input UserReg{
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }
  input UserInput {
    user: UserReg
    document_number: String!
    phone_number: String!
    accept_conditions: Boolean!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  type Mutation {
    registerUser(input: UserInput): UserResponse
    loginUser(input: AuthInput): Token
  }
`;

export default typeDefs;
