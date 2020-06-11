import {gql} from "apollo-server-lambda";

const testType = gql`
  type Available {
    users: String
    permissions: String
    groups: String
    enterprises: String
    enterprise_users: String
  }
  type Representative {
    id: ID
    created: String
    updated: String
    document_number: String
    phone_number: String
    accept_conditions: String
    user: Int
    favorite_provider: String
    favorite_payer: String
    enterprises: String
  }
  type Enterprise {
    id: String,
    created: String
    updated: String
    name: String
    business_name: String
    document_number: String
    country: String
    city: String
    address: String
    postal_code: String
  }
  type enterprisePayerAssociation {
    id: ID
    created: String!
    updated: String
    enterprise: Int
  }
  type payersRepresentative {
    favorite: Enterprise
    payers: [Enterprise]
  }
  input EnterpriseInput {
    name: String!
    business_name: String!
    country: String!
    city: String!
    address: String!
    postal_code: String!
    document_number:String!
  } 
  
  type Query {
    Services : Available
    representatives: [Representative]
    payerCompanyForRepresentative(representantive_id: Int! ): payersRepresentative
  }
  extend type Mutation {
    enterprises(input: EnterpriseInput): Enterprise
    newEnterprisePayer(enterprise_id: Int! ): enterprisePayerAssociation
    
  }
  `;

export default testType;
