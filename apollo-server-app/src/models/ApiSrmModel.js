import {RESTDataSource} from 'apollo-datasource-rest';

/* Official Api Methods */
class SrmAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.API_SRM;
        console.log("SrmAPI baseURL");
        console.log(this.baseURL);
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

    async getRepresentatives(input) {
        const services = await this.get(`representatives`);
        return services;
    };

    async getPayerCompanyForRepresentative(input) {
        const services = await this.get(`representatives/${input}/payers`);
        return services;
    };
    //Register
    async postEnterprises (input){
        const payload = input;
        const enterprise = await this.post(
            `enterprises/`, // api django path
            payload, // request body
        );
        return enterprise;
    };
    async postPayers(input){

        const payload = { "enterprise":input};
        const payer = await this.post(
            `payers/`, // api django path
            payload, // request body
        );
        return payer;
    };
}

export default SrmAPI;
