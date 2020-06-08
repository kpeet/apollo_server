import  { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';
dotenv.config();

class SrmAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SRM;
  };

  //Login
  async login(input){
      const payload = {
        "username": input.email,
        "password": input.password
      };
      const user_login = await this.post(
        `login/`, // path
        payload, // request body
      );
      return user_login;
  };

  //Register
  async userRegister (input){
    const payload = {
      "username": input.email,
      "password": input.password,
      "email": input.email,
      "first_name": input.name,
      "last_name": input.last_name
    };
    const user_login = await this.post(
      `register/`, // api django path
       payload, // request body
    );
    return user_login
  };

}

export default SrmAPI;
