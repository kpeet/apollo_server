import {RESTDataSource} from 'apollo-datasource-rest';

/* Official Api Methods */
class SrmAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.API_SRM;
    };

    //Set headers (Authorization Bearer)
    willSendRequest(request) {
        try {
            request.headers.set('Authorization', `Bearer ${this.context.extra.refresh.access}`);
        } catch (e) { /* do nothing */
        }
    }

    //Get Available Services Api
    async getAvailableServices(input) {
        const services = await this.get(``);
        return services;
    };

    //Obtener lista de Representantes
    async getRepresentatives(input) {
        const services = await this.get(`representatives`);
        return services;
    };

    //Obtener lista de empresas pagadoras en función al representante
    async getPayerCompanyForRepresentative(input) {
        //TODO: modificar el page_size=1000 por sistema de paginado
        const services = await this.get(`representatives/${input}/payers/`);
        return services;
    };

    //Crear Empresa
    async postEnterprises(input) {
        const payload = input;
        const enterprise = await this.post(
            `enterprises/`, // api django path
            payload, // request body
        );
        return enterprise;
    };

    //Crear Empresa pagadora en función a empresa creada
    async postPayers(input) {

        const payload = {"enterprise": input};
        const payer = await this.post(
            `payers/`, // api django path
            payload, // request body
        );
        return payer;
    };

    //Asignar lista de representantes a empresas pagadoras
    async postAsssignRepresentativeToPayerEnterprise(payer_id, representantive_list) {

        const payload = {"representatives": representantive_list};
        const payer = await this.post(
            `payers/${payer_id}/representatives/`, // api django path
            payload, // request body
        );
        return payer;
    };

    //Agregar un pago confirmado
    async confirmedPayment(payer_id, confirmed_payment_payload) {

        const payload = confirmed_payment_payload;
        const payer = await this.post(
            `payers/${payer_id}/confirmed_payment/`, // api django path
            payload, // request body
        );
        return payer;
    };

    //Obtener lista de pagos confirmados por pagador
    async getConfirmedPaymentByPayer(payer_id, confirmed_payment_state_filter) {

        //TODO: modificar el page_size=1000 por sistema de paginado
        const confirmed_payment = await this.get(
            `payers/${payer_id}/confirmed_payment/?state=${confirmed_payment_state_filter}&page_size=1000`
        );
        return confirmed_payment;
    };

    //Asignar empresa pagadora a representante
    async setRepresentativeFavoritePayer(payer_id, user_representative_id) {

        const payload =  {"payer": payer_id};
        const confirmed_payment = await this.post(
            `representatives/${user_representative_id}/set_favorite_payer/`,
            payload,
        );

        return confirmed_payment;
    };

   //Confirmed  Payment Close (cierre de pago confirmado)
   async confirmedPaymentClose(confirmed_payment_id){
     const payload = {};
     const response = await this.post(
       `confirmed_payments/${confirmed_payment_id}/close/`,
        payload,
      );
     return response;
   };
    //Get confirmed Payment by id
    async getConfirmedPayment(confirmed_payment_id){
        const response = await this.get(
            `confirmed_payments/${confirmed_payment_id}/`
        );
        return response;
    };


}

export default SrmAPI;
