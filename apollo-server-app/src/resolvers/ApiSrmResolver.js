const resolvers = {
    Query: {
        Services: async (_source, _args, {dataSources}) => {
            return dataSources.SrmAPI.getAvailableServices();
        },

        representatives: async (_source, _args, {dataSources}) => {
            const result = await dataSources.SrmAPI.getRepresentatives();
            return result.results;
        },

        payerCompanyForRepresentative: async (_source, {input}, {dataSources}) => {
            const representantive_id=input.representantive_id
            const result = await dataSources.SrmAPI.getPayerCompanyForRepresentative(representantive_id);
            return result;
        },
        confirmedPayment: async (_source, { filters }, { dataSources }) => {
            try{

                const confirmed_payment_state_filter=  filters.confirmed_payment_state? filters.confirmed_payment_state: "";

                const result = await dataSources.SrmAPI.getConfirmedPaymentByPayer(filters.payer_id,confirmed_payment_state_filter);
                //TODO: Falta implementar paginado
                return result.results;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        confirmedPaymentDetail: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.getConfirmedPayment(input.id);
                console.log("RESULTADO");
                console.log(result);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        getPayerListFromProvider: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.getPayerListFromProvider(input.id);
                console.log("RESULTADO");
                console.log(result);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        getProviderListFromPayer: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.getProviderListFromPayer(input.id);
                console.log("RESULTADO");
                console.log(result);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        providerCompanyForRepresentative: async (_source, {input}, {dataSources}) => {
            const representantive_id=input.representantive_id
            const result = await dataSources.SrmAPI.getProvidersCompanyForRepresentative(representantive_id);
            let providerWithPayers ={favorite:result.favorite, providers:[]};
            for(let provider of result.providers){
              provider['payers'] = await dataSources.SrmAPI.getPayerListFromProvider(provider.id);
              providerWithPayers.providers.push(provider);
            }
            return providerWithPayers;
        },
    },
    Mutation: {
        enterprises: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.postEnterprises(input);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        newEnterprisePayer: async (_source, { enterprise_id }, { dataSources }) => {
            try{

                const result = await dataSources.SrmAPI.postPayers(enterprise_id);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        asssignRepresentativeToPayerEnterprise: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.postAsssignRepresentativeToPayerEnterprise(input.payer_id,input.representatives);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        confirmedPayment: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.confirmedPayment(input.payer_id,input);
                //TODO: Falta implementar paginado
                return result.results;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        setRepresentativeFavoritePayer: async (_source, { input }, { dataSources }) => {

            try{
                const result = await dataSources.SrmAPI.setRepresentativeFavoritePayer(input.payer_id,input.user_id);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        confirmedPaymentClose: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.confirmedPaymentClose(input.confirmed_payment_id);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },

        //PROVEEDORES
        newEnterpriseProvider: async (_source, { enterprise_id }, { dataSources }) => {
            try{

                const result = await dataSources.SrmAPI.postProvider(enterprise_id);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        asssignRepresentativeToProviderEnterprise: async (_source, { input }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.postAsssignRepresentativeToProviderEnterprise(input.provider_id,input.representatives);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        setRepresentativeFavoriteProvider: async (_source, { input }, { dataSources }) => {

            try{
                const result = await dataSources.SrmAPI.setRepresentativeFavoriteProvider(input.provider_id,input.user_id);
                return result;
            }catch(error){
                console.log(error);
                throw error;
            }
        },

    }

};

export default resolvers;