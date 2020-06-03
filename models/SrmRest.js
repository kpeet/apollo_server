const {RESTDataSource} = require('apollo-datasource-rest');


class SrmRest extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:8071/'
    }

    // an example making an HTTP POST request
    async login(login_user) {
        const data = await this.post(
                                    `login`, // path
                                    login_user, // request body
                                );
        console.log("RESULTADO LOGIN");
        console.log(data.access)
        const token_result = {
            token: data.access
        }
        return token_result;
    }


    async listAccounts() {
        const data = await this.get('accounts/');
        return data.results;
    }


    async newAUserRegister(new_user) {
        return this.post(
            `register`, // path
            new_user, // request body
        );
    }
}

module.exports = SrmRest;