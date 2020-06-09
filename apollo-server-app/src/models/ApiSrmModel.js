import  { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';
dotenv.config();

/* Official Api Methods */
class SrmAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SRM;
  };

  //Set headers (Authorization Bearer)
  willSendRequest(request) {
    try {
      request.headers.set('Authorization',`Bearer ${this.context.extra.refresh.access}`);
    } catch (e) { /* do nothing */ }
  }

  //Get Available Services Api
  async getAvailableServices (input){
    const services = await this.get(``);
    return services;
  };
}

export default SrmAPI;
