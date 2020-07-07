import { RESTDataSource } from "apollo-datasource-rest";

class ResgitryKimchiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_REGISTRY;
  }

  // Set headers (Authorization Bearer)
  willSendRequest(request) {
    try {
      request.headers.set(
        "Authorization",
        `Bearer ${this.context.extrakimchi.token}`
      );
    } catch (e) {
      /* do nothing */
    }
  }

  // Paso 1 Registrar empresa
  async createKimchiEnterprise(input) {
    // TODO: Kimchi solo recibe formatos de rut chilenos!!
    const payload = input;
    const new_company = await this.post(
      "enterprises/", // api django path
      payload // request body
    );
    return new_company;
  }

  // Paso 2 Registrar empresa
  async createKimchiEnterpriseProfile(input) {
    const payload = input;

    const new_company_profile = await this.post(
      "enterprise-profiles/", // api django path
      payload // request body
    );
    return new_company_profile;
  }
  // Paso 3 Cuanta bancaria empresa EN ApiBankModels

  // Paso 4 Approve de enterprise
  async approveEnterprise(enterprise_id, input) {
    const payload = input;
    const forgot_password = await this.post(
      `enterprises/${enterprise_id}/approve/`, // api django path
      payload // request body
    );
    return forgot_password;
  }

  // Confirmación de cambio de contraseña
  async confirmChangePassword(input) {
    const forgot_password_confirm = await this.post(
      "forgot-password/confirm/", // api django path
      input // request body
    );
    return forgot_password_confirm;
  }
}

export default ResgitryKimchiApi;
