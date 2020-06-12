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
  
  type Invoice{
    id: ID
    amount: Float
    issuance_date: String
    document_number: Int
  }
  type ConfirmedPayment{
    id: ID
    amount: Float
    payment_date: String
    provider_document_number: String
    user: Int
    invoices: [Invoice]
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
  input AssignPayerRepresentativeInput {
    payer_id: Int!
    representatives: [Int]
    
  }
  input InvoiceInput {
    amount: Float!
    issuance_date: String!
    document_number: Int!
    
  } 
  input ConfirmedPaymentInput {
    payer_id: Int!
    amount: Float!
    payment_date: String!
    provider_document_number: String!
    user: Int!
    invoices: [InvoiceInput]
  }
  input ConfirmedPaymentFilterInput{
    payer_id: Int!
  } 
  input setRepresentativeFavoritePayerInput{
    payer_id: Int!
    user_id: Int!
  }  
  input RepresentantiveInput {
    representantive_id: Int! 
  } 
  
  type Query {
    Services : Available
    representatives: [Representative]
    payerCompanyForRepresentative(input: RepresentantiveInput): payersRepresentative
    confirmedPayment(filters: ConfirmedPaymentFilterInput): [ConfirmedPayment]
  }
  extend type Mutation {
    enterprises(input: EnterpriseInput): Enterprise
    newEnterprisePayer(enterprise_id: Int! ): enterprisePayerAssociation
    asssignRepresentativeToPayerEnterprise(input: AssignPayerRepresentativeInput): [Representative]
    confirmedPayment(input: ConfirmedPaymentInput): [ConfirmedPayment]
    setRepresentativeFavoritePayer(input: setRepresentativeFavoritePayerInput): Representative
    
  }
  `;

export default testType;
