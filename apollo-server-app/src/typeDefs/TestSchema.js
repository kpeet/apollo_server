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
  type payers {
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
  type payersRepresentantive {
    favorite: payers
    payers: [payers]
  }
  
  type Query {
    Services : Available
    representatives: [Representative]
    payerCompanyForRepresentative(representantive_id: Int! ): payersRepresentantive
  }`;

export default testType;
