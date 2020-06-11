import {RESTDataSource} from 'apollo-datasource-rest';

class SrmAUTH extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.API_SRM;
    };

    //Login
    async login(input) {
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
    async userRegister(input) {
        //Transform input (email replace username)
        input.user['username'] = input.user.email;
        const payload = {
            user: input.user,
            document_number: input.document_number,
            phone_number: input.phone_number,
            accept_conditions: input.accept_conditions
        };
        const user_login = await this.post(
            `register/`, // api django path
            payload, // request body
        );
        return user_login;
    };

    //Solicitud de cambio de contraseña
    async forgotPassword(input) {
        const forgot_password = await this.post(
            `forgot-password/`, // api django path
            input, // request body
        );
        return forgot_password;
    };
    //Confirmación de cambio de contraseña
    async confirmChangePassword(input) {
        const forgot_password_confirm = await this.post(
            `forgot-password/confirm/`, // api django path
            input, // request body
        );
        return forgot_password_confirm;
    };

}

export default SrmAUTH;
