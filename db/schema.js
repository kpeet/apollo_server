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
        
        
        input UsuarioInput {
             nombre: String!
            apellido: String!
            email: String!
            password: String!
        }
        


        type Query {
            obtenerCursos: String
        }
        type Mutation {
            nuevoUsuario(input: UsuarioInput): String 
        }
        
`;


module.exports = typeDefs;