const resolvers = {
  Query: {
    representatives: async (_source, _args, { dataSources }) => {
      const result = await dataSources.SrmAPI.getRepresentatives();
      return result.results;
    },

    payerCompanyForRepresentative: async (
      _source,
      { input },
      { dataSources }
    ) => {
      const { representantive_id } = input;
      const result = await dataSources.SrmAPI.getPayerCompanyForRepresentative(
        representantive_id
      );
      return result;
    },
    confirmedPayment: async (_source, { filters }, { dataSources }) => {
      try {
        const confirmed_payment_state_filter = filters.confirmed_payment_state
          ? filters.confirmed_payment_state
          : "";

        const result = await dataSources.SrmAPI.getConfirmedPaymentByPayer(
          filters.payer_id,
          confirmed_payment_state_filter
        );
        // TODO: Falta implementar paginado
        return result.results;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    confirmedPaymentDetail: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.getConfirmedPayment(input.id);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getPayerListFromProvider: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.getPayerListFromProvider(
          input.id
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getProviderListFromPayer: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.getProviderListFromPayer(
          input.id
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    providerCompanyForRepresentative: async (
      _source,
      { input },
      { dataSources }
    ) => {
      const { representantive_id } = input;
      const result = await dataSources.SrmAPI.getProvidersCompanyForRepresentative(
        representantive_id
      );
      const providerWithPayers = { favorite: result.favorite, providers: [] };
      // eslint-disable-next-line
        for (const provider of result.providers) {
        // eslint-disable-next-line
        provider.payers = await dataSources.SrmAPI.getPayerListFromProvider(
          provider.id
        );
        providerWithPayers.providers.push(provider);
      }
      return providerWithPayers;
    },
    providerConfirmedPayment: async (_source, { filters }, { dataSources }) => {
      try {
        const confirmed_payment_state_filter = filters.confirmed_payment_state
          ? filters.confirmed_payment_state
          : "";
        const payer_enterprise_filter = filters.payer_enterprise
          ? filters.payer_enterprise
          : "";
        const provider_enterprise_filter = filters.provider_enterprise
          ? filters.provider_enterprise
          : "";
        const id_filter = filters.id ? filters.id : "";
        const payment_date_filter = filters.payment_date
          ? filters.payment_date
          : "";
        const amount_filter = filters.amount ? filters.amount : "";

        const confirmed_payment_list = await dataSources.SrmAPI.getConfirmedPaymentByProvider(
          filters.provider_id,
          confirmed_payment_state_filter,
          payer_enterprise_filter,
          provider_enterprise_filter,
          id_filter,
          payment_date_filter,
          amount_filter
        );

        let bank_account = [];
        try {
          bank_account = await dataSources.SrmAPI.getProviderBankAccount(
            filters.provider_id
          );
        } catch (error) {
          console.log(error);
        }
        const response = {
          confirmed_payment_list: confirmed_payment_list.results,
          provider_bank_account_list: bank_account
        };

        // TODO: Falta implementar paginado
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    advanceSimulation: (_source, { input }, { dataSources }) => {
      try {
        const result = dataSources.SrmAPI.advanceSimulation(
          input.confirmed_amount,
          input.monthly_discount,
          input.advance_days
        );

        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    bank: async (_source, _, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.getBank();
        // TODO: Falta implementar paginado
        console.log(JSON.stringify(result));
        return result.results;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    bankAccountType: async (_source, _, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.getBankAccountType();
        // TODO: Falta implementar paginado
        return result.results;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Mutation: {
    enterprises: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.postEnterprises(input);
        console.log("Creando empresa result");
        console.log(result);

        // TODO: Integración con Kimchi- hay que refactorizar. Posiblemente trasladar a un apollo-kimchi. Necesario manejo de errores, etc
        // Inicio prueba Kimchi
        console.log("EN KIMCHI");
        try {
          const create_enterprise_registry_kimchi_payload = {
            type: "eirl",
            business_name: input.business_name,
            fantasy_name: input.business_name,
            representative: 10,
            document_number: input.document_number,
            country: 1,
            creator: 10
          };
          const enterprise_registry_kimchi = await dataSources.RegistryKimchiApi.createKimchiEnterprise(
            create_enterprise_registry_kimchi_payload
          );
          console.log("Creando empresa result en Kimchi ");
          console.log(enterprise_registry_kimchi);
          console.log(enterprise_registry_kimchi.id);

          try {
            const create_enterprise_profile_registry_kimchi_payload = {
              enterprise: enterprise_registry_kimchi.id,
              activities: [
                {
                  activity_id: 1,
                  name: "CULTIVO DE TRIGO"
                }
              ],
              constitution_date: "2020-06-01",
              phones: [
                {
                  phone_number: "234234243",
                  phone_type: "mobile"
                }
              ],
              addresses: [
                {
                  country: 1,
                  level_one_address: 2,
                  level_two_address: 6,
                  street: "calle de la perdición",
                  building: "306",
                  sub_building: "666",
                  zip_code: "306-666"
                }
              ],
              email: "kpeet@inf.utfsm.cl",
              webpage: "",
              description: "",
              legal_representative: []
            };
            const enterprise_profile_registry_kimchi = await dataSources.RegistryKimchiApi.createKimchiEnterpriseProfile(
              create_enterprise_profile_registry_kimchi_payload
            );
            console.log("Creando Profile en Kimcho ");
            console.log(enterprise_profile_registry_kimchi);

            try {
              const create_enterprise_bank_account_registry_kimchi_payload = {
                is_payer: true,
                fantasy_name: input.business_name,
                has_profile: true,
                is_requester: true,
                created: "2020-06-26T22:49:46.178059Z",
                business_name: input.business_name,
                is_investor: false,
                document_number: input.document_number,
                state: "new",
                country: 1,
                approved: true,
                type: "eirl",
                updated: "2020-06-26T22:49:46.178105Z",
                id: enterprise_profile_registry_kimchi.enterprise,
                representative: 10
              };
              const enterprise_bank_ccount_registry_kimchi = await dataSources.RegistryKimchiApi.approveEnterprise(
                enterprise_profile_registry_kimchi.enterprise,
                create_enterprise_bank_account_registry_kimchi_payload
              );
              console.log("Aprovando empresa!!!!!!!! ");
              console.log(enterprise_bank_ccount_registry_kimchi);

              // const create_enterprise_bank_account_registry_kimchi_payload ={
              //     enterprise:{
              //         id:enterprise_registry_kimchi.id,
              //         name:input.business_name,
              //         document_number: input.document_number
              //     },
              //     errors:{
              //
              //     },
              //     user:{
              //         id:"",
              //         name:"",
              //         document_number:""
              //     },
              //     account_holder_document_number:input.document_number,
              //     account_type:1,
              //     account_holder_name:input.business_name,
              //     default_account:false,
              //     typeAddressee:"enterprises",
              //     account_number:"6666666666",
              //     bank:3,
              //     email:"kpeet@inf.utfsm.cl"
              // };
              // const enterprise_bank_ccount_registry_kimchi = await dataSources.BankingKimchiApi.createKimchiEnterpriseBankAccount(create_enterprise_bank_account_registry_kimchi_payload);
              // console.log("Creando Bank Account en Kimcho ");
              // console.log(enterprise_bank_ccount_registry_kimchi);
              return enterprise_registry_kimchi;
            } catch (error) {
              console.log("Error Kimchi ");
              console.log(error);
              throw error;
            }
          } catch (error) {
            console.log(error);
            throw error;
          }
        } catch (error) {
          console.log(error);
          /* do nothing */
        }

        // Cierre prueba Kimchi

        return result;
      } catch (error) {
        console.log("Error SRM ");
        console.log(error);
        throw error;
      }
    },
    newEnterprisePayer: async (_source, { enterprise_id }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.postPayers(enterprise_id);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    asssignRepresentativeToPayerEnterprise: async (
      _source,
      { input },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.postAsssignRepresentativeToPayerEnterprise(
          input.payer_id,
          input.representatives
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    setRepresentativeFavoritePayer: async (
      _source,
      { input },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.setRepresentativeFavoritePayer(
          input.payer_id,
          input.user_id
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // PAGOS CONFIRMADOS
    confirmedPaymentClose: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.confirmedPaymentClose(
          input.confirmed_payment_id
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    confirmedPayment: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.confirmedPayment(
          input.payer_id,
          input
        );
        // TODO: Falta implementar paginado
        return result.results;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // ATTEMPS DE PAGOS CONFIRMADOS
    confirmedPaymentAdvanceAttempt: async (
      _source,
      { input },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.createConfirmedPaymentAdvanceAttempt(
          input
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    // PROVEEDORES
    newEnterpriseProvider: async (
      _source,
      { enterprise_id },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.postProvider(enterprise_id);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    asssignRepresentativeToProviderEnterprise: async (
      _source,
      { input },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.postAsssignRepresentativeToProviderEnterprise(
          input.provider_id,
          input.representatives
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    setRepresentativeFavoriteProvider: async (
      _source,
      { input },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.setRepresentativeFavoriteProvider(
          input.provider_id,
          input.user_id
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /// Attempts
    confirmedPaymentAttemptState: async (
      _source,
      { input },
      { dataSources }
    ) => {
      try {
        const result = await dataSources.SrmAPI.confirmedPaymentAttemptState(
          input.state,
          input.attempt_id
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    newProviderBankAccount: async (_source, { input }, { dataSources }) => {
      try {
        const result = await dataSources.SrmAPI.newProviderBankAccount(
          input.provider_id,
          input
        );
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

export default resolvers;
