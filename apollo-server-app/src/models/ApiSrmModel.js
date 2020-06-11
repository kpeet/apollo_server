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
        const services = await this.get(`representatives/${input}/payers`);
        return services;
    };
    //Crear Empresa
    async postEnterprises (input){
        const payload = input;
        const enterprise = await this.post(
            `enterprises/`, // api django path
            payload, // request body
        );
        return enterprise;
    };
    //Crear Empresa pagadora en función a empresa creada
    async postPayers(input){

        const payload = { "enterprise":input};
        const payer = await this.post(
            `payers/`, // api django path
            payload, // request body
        );
        return payer;
    };
    //Asignar lista de representantes a empresas pagadoras
    async postAsssignRepresentativeToPayerEnterprise(payer_id, representantive_list){

        const payload = { "representatives":representantive_list};
        const payer = await this.post(
            `payers/${payer_id}/representatives/`, // api django path
            payload, // request body
        );
        return payer;
    };
}

export default SrmAPI;
