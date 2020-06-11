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

    }

};

export default resolvers;
