import  { RESTDataSource } from 'apollo-datasource-rest';

class SrmAUTH extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_SRM;
  };

  //Login
  async login(input){
      //Transform input
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
    //Transform input
    input = { ...input, username: input.email };
    const user_login = await this.post(
      `register/`, // api django path
       input, // request body
    );
    return user_login;
  };

}
export default SrmAUTH;
