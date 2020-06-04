const {RESTDataSource} = require('apollo-datasource-rest');


class SRMAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://172.28.0.6:8000/'
    }

    //LOGIN
    // an example making an HTTP POST request
    async login(email, password) {
        console.log("INICIANDO LOGIN");

        const payload = {
            "username": email,
            "password": password
        }
        const user_login = await this.post(
            `login/`, // path
            payload, // request body
        );
        console.log("user_login");
        console.log(user_login);

        return user_login;
    }

    //CREAR USUARIOS
    // an example making an HTTP POST request
    async userRegister(nombre, apellido, email, password) {
        console.log("INICIANDO userRegister");
        const payload = {
            "username": email,
            "password": password,
            "email": email,
            "first_name": nombre,
            "last_name": apellido
        };

         const user_login =await this.post(
            `register/`, // path
            payload, // request body
        );
        console.log("user_login");
        console.log(user_login);

        return user_login
    }


    async getUsers(id) {
        return this.get(`accounts/${id}/`);
    }

    async listAccounts() {
        const data = await this.get('accounts/');
        return data.results;
    }

}

module.exports = SRMAPI;
