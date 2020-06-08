//Resolvers
const resolvers = {
  Query:{
  },
  Mutation: {
    registerUser: async (_source, { input }, { dataSources }) => {
      try{
        const result = await dataSources.SrmAUTH.userRegister(input);
        return result;
      }catch(error){
        console.log(error);
        throw error;
      }
    },
    loginUser: async (_source, { input }, { dataSources }) => {
      const result = await dataSources.SrmAUTH.login(input);
      return result;
    },
  }
};

export default resolvers;
