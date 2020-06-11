



const resolvers = {
  Query: {
    Services: async (_source, _args, { dataSources }) => {
      return dataSources.SrmAPI.getAvailableServices();
    },

      representatives: async (_source, _args, { dataSources }) => {
          const result= await dataSources.SrmAPI.getRepresentatives();
          return result.results;
      },

      payerCompanyForRepresentative: async (_source, {representantive_id}, { dataSources }) => {
          const result= await dataSources.SrmAPI.getPayerCompanyForRepresentative(representantive_id);
          return result;
      },
  },
};

export default resolvers;
