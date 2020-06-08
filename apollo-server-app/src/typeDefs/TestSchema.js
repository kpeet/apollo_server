import { gql } from "apollo-server";

const testType = gql`
  type Available {
    users: String
    permissions: String
    groups: String
    enterprises: String
    enterprise_users: String
  }
  type Query {
    Services : Available
  }`;

export default testType;
