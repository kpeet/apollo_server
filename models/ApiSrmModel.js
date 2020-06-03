import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from 'dotenv';

/* Get env vars, base urls */
dotenv.config();

const { srmApiBaseUrl: srmApiBaseUrl } = process.env;

class SrmAPI extends RESTDataSource {
  constructor() {
    console.log("")
    super();
    this.baseURL = srmApiBaseUrl;
  }

    // an example making an HTTP POST request
    async login(login_user) {
        const data = await this.post(
            `login`, // path
            login_user, // request body
        );
        console.log("RESULTADO LOGIN");
        console.log(data.access);
        const token_result = {
            token: data.access
        }
        return token_result;
    }

    async newAUserRegister(new_user) {
        return this.post(
            `register`, // path
            new_user, // request body
        );
    }
}

export default SrmAPI;
