import { RESTDataSource } from "apollo-datasource-rest";

/* Official Api Methods */
class SrmAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SRM;
  }

  // Set headers (Authorization Bearer)
  willSendRequest(request) {
    try {
      request.headers.set(
        "Authorization",
        `Bearer ${this.context.extra.refresh.access}`
      );
    } catch (e) {
      /* do nothing */
    }
  }

  // Obtener lista de Representantes
  async getRepresentatives() {
    const services = await this.get("representatives");
    return services;
  }

  // Obtener lista de empresas pagadoras en función al representante
  async getPayerCompanyForRepresentative(input) {
    // TODO: modificar el page_size=1000 por sistema de paginado
    const services = await this.get(`representatives/${input}/payers/`);
    return services;
  }

  // Crear Empresa
  async postEnterprises(input) {
    const payload = input;
    const enterprise = await this.post(
      "enterprises/", // api django path
      payload // request body
    );
    return enterprise;
  }

  // Crear Empresa pagadora en función a empresa creada
  async postPayers(input) {
    const payload = { enterprise: input };
    const payer = await this.post(
      "payers/", // api django path
      payload // request body
    );
    return payer;
  }

  // Asignar lista de representantes a empresas pagadoras
  async postAsssignRepresentativeToPayerEnterprise(
    payer_id,
    representantive_list
  ) {
    const payload = { representatives: representantive_list };
    const payer = await this.post(
      `payers/${payer_id}/representatives/`, // api django path
      payload // request body
    );
    return payer;
  }

  // Agregar un pago confirmado
  async confirmedPayment(payer_id, confirmed_payment_payload) {
    const payload = confirmed_payment_payload;
    const payer = await this.put(
      `payers/${payer_id}/confirmed_payment/`, // api django path
      payload // request body
    );
    return payer;
  }

  // Obtener lista de pagos confirmados por pagador
  async getConfirmedPaymentByPayer(payer_id, confirmed_payment_state_filter) {
    // TODO: modificar el page_size=1000 por sistema de paginado
    const confirmed_payment = await this.get(
      `payers/${payer_id}/confirmed_payment/?state=${confirmed_payment_state_filter}&page_size=1000`
    );
    return confirmed_payment;
  }

  // Asignar empresa pagadora a representante
  async setRepresentativeFavoritePayer(payer_id, user_representative_id) {
    const payload = { payer: payer_id };
    const confirmed_payment = await this.put(
      `representatives/${user_representative_id}/set_favorite_payer/`,
      payload
    );

    return confirmed_payment;
  }

  // Confirmed  Payment Close (cierre de pago confirmado)
  async confirmedPaymentClose(confirmed_payment_id) {
    const payload = {};
    const response = await this.post(
      `confirmed_payments/${confirmed_payment_id}/close/`,
      payload
    );
    return response;
  }

  // Get confirmed Payment by id
  async getConfirmedPayment(confirmed_payment_id) {
    const response = await this.get(
      `confirmed_payments/${confirmed_payment_id}/`
    );
    return response;
  }

  // PROVEEDORES
  // Crear Empresa proveedora en función a empresa creada
  async postProvider(input) {
    const payload = { enterprise: input };
    const providers = await this.post(
      `providers/`, // api django path
      payload // request body
    );
    return providers;
  }

  // Asignar lista de representantes a empresas proveedora
  async postAsssignRepresentativeToProviderEnterprise(
    provider_id,
    representantive_list
  ) {
    const payload = { representatives: representantive_list };
    const payer = await this.post(
      `providers/${provider_id}/representatives/`, // api django path
      payload // request body
    );
    return payer;
  }

  // Asignar empresa proveedora a representante
  async setRepresentativeFavoriteProvider(provider_id, user_representative_id) {
    const payload = { provider: provider_id };
    const confirmed_payment = await this.put(
      `representatives/${user_representative_id}/set_favorite_provider/`,
      payload
    );

    return confirmed_payment;
  }

  // Traer proveedores asociados a un pagador
  async getProviderListFromPayer(payer_id) {
    const provider_list = await this.get(`payers/${payer_id}/providers/`);

    return provider_list;
  }

  // Traer pagadores asociados a un proveedor
  async getPayerListFromProvider(provider_id) {
    const payer_list = await this.get(`providers/${provider_id}/payers/`);

    return payer_list;
  }

  // Obtener lista de empresas pagadoras en función al representante
  async getProvidersCompanyForRepresentative(input) {
    const services = await this.get(`representatives/${input}/providers/`);
    return services;
  }

  // Obtener lista de pagos confirmados por proveedor
  async getConfirmedPaymentByProvider(
    payer_id,
    confirmed_payment_state_filter,
    payer_enterprise_filter,
    provider_enterprise_filter,
    id_filter,
    payment_day_filter,
    amount_filter
  ) {
    // TODO: modificar el page_size=1000 por sistema de paginado
    const confirmed_payment = await this.get(
      `providers/${payer_id}/confirmed_payment/?state=${confirmed_payment_state_filter}&payer_enterprise=${payer_enterprise_filter}&provider_enterprise=${provider_enterprise_filter}&id=${id_filter}&payment_day=${payment_day_filter}&amount=${amount_filter}&page_size=1000`
    );

    console.log(JSON.stringify(confirmed_payment));

    return confirmed_payment;
  }
  // Obtener cuenta bancaria del proveedor
  async getProviderBankAccount(
    provider_id
  ) {
    const bank_account_list = await this.get(
      `providers/${provider_id}/bank_account/`
    );

    console.log(JSON.stringify(bank_account_list));

    return bank_account_list;
  }
    async newProviderBankAccount(
        provider_id,
        input
    ) {

      const payload = input;
        const bank_account = await this.put(
            `providers/${provider_id}/bank_account/`,
            payload

        );
        console.log(JSON.stringify(bank_account));

        return bank_account;
    }

    async getBank(
    ) {
        // TODO: modificar el page_size=1000 por sistema de paginado
        const bank_list = await this.get(
            `banks/?page_size=1000`
        );


        return bank_list;
    }
    async getBankAccountType(
    ) {
        // TODO: modificar el page_size=1000 por sistema de paginado
        const bank_account_type_list = await this.get(
            `bank_account_types/?page_size=1000`
        );
        console.log(JSON.stringify(bank_account_type_list));

        return bank_account_type_list;
    }

    // Obtener lista de pagos confirmados por proveedor
  // eslint-disable-next-line
  advanceSimulation(confirmed_amount, monthly_discount, advance_days) {
    const advance_amount = Math.ceil(
      confirmed_amount / (1 + (monthly_discount / 30) * advance_days)
    );

    const payload = {
      advance_amount
    };

    return payload;
  }

  // Crear Attempt de pago confirmado por Anticipo
  async createConfirmedPaymentAdvanceAttempt(input) {

    console.log("createConfirmedPaymentAdvanceAttempt input");
    console.log(input);
    const payload = {
      simulation: {
        confirmed_amount: input.simulation.confirmed_amount,
        monthly_discount: input.simulation.monthly_discount,
        advance_amount: input.simulation.advance_amount,
        advance_days: input.simulation.advance_days
      },
        confirmed_payments:input.confirmed_payments,
        bank_account: input.bank_account
    };
      console.log("createConfirmedPaymentAdvanceAttempt payload");
      console.log(payload);
    const attemp_simulation = await this.put(
      `confirmed_payments/advance_attempt/`,
      payload
    );

      console.log("createConfirmedPaymentAdvanceAttempt RESPONSE");
      console.log(attemp_simulation);

    return attemp_simulation;
  }
    async confirmedPaymentAttemptState(
        state, confirmed_payment_attempt_id
    ) {
        const confirmed_payment_attempts_result = await this.post(
            `confirmed_payment_attempts/${confirmed_payment_attempt_id}/${state}/`
        );
        console.log(JSON.stringify(confirmed_payment_attempts_result));

        return confirmed_payment_attempts_result;
    }
}

export default SrmAPI;
