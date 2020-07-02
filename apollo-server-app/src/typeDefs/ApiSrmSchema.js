import { gql } from "apollo-server-lambda";

const apiSrmType = gql`
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
    id: String
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
  type EnterpriseWithPayers {
    id: String
    created: String
    updated: String
    name: String
    business_name: String
    document_number: String
    country: String
    city: String
    address: String
    postal_code: String
    payers: [Enterprise]
  }
  type enterprisePayerAssociation {
    id: ID
    created: String!
    updated: String
    enterprise: Int
  }
  type enterpriseAssociation {
    id: ID
    created: String!
    updated: String
    enterprise: Int
  }
  type payersRepresentative {
    favorite: Enterprise
    payers: [Enterprise]
  }
  type providersRepresentative {
    favorite: Enterprise
    providers: [Enterprise]
  }
  type providersRepresentativeWithPayers {
    favorite: Enterprise
    providers: [EnterpriseWithPayers]
  }
  type Invoice {
    id: ID
    amount: Float
    issuance_date: String
    document_number: Int
  }
  type AdvanceSimulation {
    advance_amount: Float
  }
  type ConfirmedPayment {
    id: ID
    amount: Float
    payment_date: String
    provider_document_number: String
    user: Int
    invoices: [Invoice]
    payer_provider: Int
    representative: Int
    state: String
    representative_document_number: String
  }
  input EnterpriseInput {
    name: String!
    business_name: String!
    country: String!
    city: String!
    address: String!
    postal_code: String!
    document_number: String!
  }
  input CreateRepresentativeInput {
    id: Int!
    can_edit: Boolean!
  }
  input AssignPayerRepresentativeInput {
    payer_id: Int!
    representatives: [CreateRepresentativeInput]
  }
  input AssignProviderRepresentativeInput {
    provider_id: Int!
    representatives: [CreateRepresentativeInput]
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
  input IdInput {
    id: Int!
  }
  input ConfirmedPaymentProviderFilterInput {
    provider_id: Int!
    confirmed_payment_state: String
    payer_enterprise: Int
    provider_enterprise: Int
    id: Int
    payment_date: String
    amount: Float
  }
  input ConfirmedPaymentFilterInput {
    payer_id: Int!
    confirmed_payment_state: String
  }
  input confirmedPaymentCloseInput {
    confirmed_payment_id: Int!
  }
  input setRepresentativeFavoritePayerInput {
    payer_id: Int!
    user_id: Int!
  }
  input setRepresentativeFavoriteProviderInput {
    provider_id: Int!
    user_id: Int!
  }
  input RepresentantiveInput {
    representantive_id: Int!
  }
  input payerProviderInput {
    id: Int!
  }
  input AdvanceSimulationInput {
    confirmed_amount: Int!
    monthly_discount: Float!
    advance_days: Int!
  }
  input advanceAttemptInput {
    confirmed_payment_id: Int!
    confirmed_amount: Int!
    monthly_discount: Float!
    advance_amount: Float!
    advance_days: Int!
  }
  type Query {
    Services: Available
    representatives: [Representative]
    payerCompanyForRepresentative(
      input: RepresentantiveInput
    ): payersRepresentative
    providerCompanyForRepresentative(
      input: RepresentantiveInput
    ): providersRepresentativeWithPayers
    confirmedPayment(filters: ConfirmedPaymentFilterInput): [ConfirmedPayment]
    providerConfirmedPayment(
      filters: ConfirmedPaymentProviderFilterInput
    ): [ConfirmedPayment]
    confirmedPaymentDetail(input: IdInput): ConfirmedPayment
    getPayerListFromProvider(input: payerProviderInput): [Enterprise]
    getProviderListFromPayer(input: payerProviderInput): [Enterprise]
    advanceSimulation(input: AdvanceSimulationInput): AdvanceSimulation
  }
  extend type Mutation {
    enterprises(input: EnterpriseInput): Enterprise
    newEnterpriseProvider(enterprise_id: Int!): enterpriseAssociation
    newEnterprisePayer(enterprise_id: Int!): enterprisePayerAssociation
    asssignRepresentativeToPayerEnterprise(
      input: AssignPayerRepresentativeInput
    ): [Representative]
    asssignRepresentativeToProviderEnterprise(
      input: AssignProviderRepresentativeInput
    ): [Representative]
    confirmedPayment(input: ConfirmedPaymentInput): [ConfirmedPayment]
    confirmedPaymentClose(input: confirmedPaymentCloseInput): ConfirmedPayment
    setRepresentativeFavoritePayer(
      input: setRepresentativeFavoritePayerInput
    ): Representative
    setRepresentativeFavoriteProvider(
      input: setRepresentativeFavoriteProviderInput
    ): Representative
    confirmedPaymentAdvanceAttempt(input: advanceAttemptInput): ConfirmedPayment
  }
`;

export default apiSrmType;
