const resolvers = {
  Query: {
    Services: async (_source, _args, { dataSources }) => {
      return dataSources.SrmAPI.getAvailableServices();
    },
  },
};

export default resolvers;
