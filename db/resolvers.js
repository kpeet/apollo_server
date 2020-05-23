
//Resolvers
const resolvers = {
    Query: {
        obtenerCursos: () => "Algo"
    },
    Mutation: {
        nuevoUsuario: (_, {input}) => {
            console.log(input);




             return "Creando ....";
        }
    }
}



module.exports = resolvers;