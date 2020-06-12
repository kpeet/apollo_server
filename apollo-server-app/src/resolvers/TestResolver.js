const resolvers = {
    Query: {
        Services: async (_source, _args, {dataSources}) => {
            return dataSources.SrmAPI.getAvailableServices();
        },

        representatives: async (_source, _args, {dataSources}) => {
            const result = await dataSources.SrmAPI.getRepresentatives();
            return result.results;
        },

        payerCompanyForRepresentative: async (_source, {representantive_id}, {dataSources}) => {
            const result = await dataSources.SrmAPI.getPayerCompanyForRepresentative(representantive_id);
            return result;
        },
        confirmedPayment: async (_source, { filters }, { dataSources }) => {
            try{
                const result = await dataSources.SrmAPI.getConfirmedPayment(filters.payer_id,filters);
                //TODO: Falta implementar paginado
                return result.results;
            }catch(error){
                console.log(error);
                throw error;
            }
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

    }

};

export default resolvers;
