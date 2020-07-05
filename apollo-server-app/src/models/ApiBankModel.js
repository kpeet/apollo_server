import { RESTDataSource } from "apollo-datasource-rest";

class BankingKimchiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_BANKING;
  }

  // Paso 3 Cuanta bancaria empresa
  async createKimchiEnterpriseBankAccount(input) {
    const payload = input;
    const new_company_bank_acoount = await this.post(
      "enterprise_banks_accounts/", // api django path
      payload // request body
    );
    return new_company_bank_acoount;
  }

  // Obtener Cuentas Bancarias
  async getKimchiEnterpriseBankAccounts(input) {
    const payload = input;
    const new_company_bank_acoount = await this.post(
      "enterprise_banks_accounts/", // api django path
      payload // request body
    );
    return new_company_bank_acoount;
  }
}

export default BankingKimchiApi;
