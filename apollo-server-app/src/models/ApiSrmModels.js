const {RESTDataSource} = require('apollo-datasource-rest');


class SRMAPI extends RESTDataSource {
    constructor() {
        console.log("process.env.API_SRM");
        console.log(process.env.API_SRM);
        super();
        this.baseURL = process.env.API_SRM
    }

    //LOGIN
    // an example making an HTTP POST request
    async login(email, password) {

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
    //Cambio de contraseña
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

}

module.exports = SRMAPI;
