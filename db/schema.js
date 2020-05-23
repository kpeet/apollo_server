const {gql} = require('apollo-server');


//Schema
const typeDefs = gql`

        type Usuario{
            id: ID
            nombre: String
            apellido: String
            email: String
            crado: String
        }


        type Query {
            obtenerCursos: String
        }
        type Mutation {
            nuevoUsuario : String 
        }
        
`;


module.exports = typeDefs;