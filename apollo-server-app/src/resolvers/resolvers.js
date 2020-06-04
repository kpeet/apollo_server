
//Resolvers
const resolvers = {
    Query: {

    },
    Mutation: {
        nuevoUsuario: async (_source, { input }, { dataSources }) => {

            const  { nombre, apellido, email, password} = input;

            try{
                const result = await dataSources.SRMAPI.userRegister(nombre, apellido, email, password);
                return result;

            }catch(error){
                console.log(error);
                throw error;

            }
        },

        autenticarUsuario: async (_source, { input }, { dataSources }) => {
            const {email, password} = input;

            const result = await dataSources.SRMAPI.login(email, password);

            return result;
        },

    }

}



module.exports = resolvers;
