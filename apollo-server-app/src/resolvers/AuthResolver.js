//Resolvers
const resolvers = {
    Query: {},
    Mutation: {
        registerUser: async (_source, {input}, {dataSources}) => {
            try {
                const result = await dataSources.SrmAUTH.userRegister(input);
                return result;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        loginUser: async (_source, {input}, {dataSources}) => {
            const result = await dataSources.SrmAUTH.login(input);
            return result;
        },
        forgotPassword: async (_source, {input}, {dataSources}) => {
            console.log("input");
            console.log(input);

            const result = await dataSources.SrmAUTH.forgotPassword(input);
            return result;
        },
        confirmForgotPassword: async (_source, {input}, {dataSources}) => {
            console.log("input");
            console.log(input);

            const result = await dataSources.SrmAUTH.confirmChangePassword(input);
            return result;
        },
    }
};

export default resolvers;
