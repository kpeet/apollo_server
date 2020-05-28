const { RESTDataSource } = require('apollo-datasource-rest');


class SRMAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL='http://localhost:8007/'
    }

    async getAccount(id){
        return this.get(`accounts/${id}/`);
    }

    async listAccounts() {
        const data = await this.get('accounts/');
        return data.results;
    }


    // an example making an HTTP POST request
    async postAccount(account) {
        return this.post(
            `accounts`, // path
            account, // request body
        );
    }
    // an example making an HTTP PUT request
    async newAccount(account) {
        return this.put(
            `accounts`, // path
            account, // request body
        );
    }
}
module.exports = SRMAPI;