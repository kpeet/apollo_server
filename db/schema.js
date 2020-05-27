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
        
        type Token{
            token: String
        }
        
        type Producto {
            id: ID
            nombre: String
            existencia: Int
            precio: Float
            creado: String
        }
        
        
        input UsuarioInput {
            nombre: String!
            apellido: String!
            email: String!
            password: String!
        }
        input ProductoInput {
            nombre: String!
            existencia: Int!
            precio: Float!
        }
        input AutenticarInput {
            email: String!
            password: String!
        }
        
        type Query{
            ##Usuario
            obtenerUsuario(token:String!): Usuario
            
            ##Producto
            obtenerProductos: [Producto]
            
        }
        type Mutation {
            ##Usuarios
            nuevoUsuario(input: UsuarioInput): Usuario
            autenticarUsuario(input: AutenticarInput): Token
            
            ##Productos
            nuevoProducto(input: ProductoInput): Producto
        }
        
`;


module.exports = typeDefs;