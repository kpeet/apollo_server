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
        type Company {
            id: ID
            nombre: String
            creado: String
        }
        type Account {
            id: ID
            name: String
            external_account_type: Int
            external_account_id: Int
            owner: Int
        }
        
        type AccountInput {
            name: String
            external_account_type: Int
            external_account_id: Int
            owner: Int
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
        input CompanyInput {
            nombre: String!
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
            
            ##Company
            accountlist: [Account]
            getAccount: Account
            
        }
        type Mutation {
            ##Usuarios
            nuevoUsuario(input: UsuarioInput): Usuario
            autenticarUsuario(input: AutenticarInput): Token
            
            ##Productos
            nuevoProducto(input: ProductoInput): Producto
            
            
            ##Company
            newCompany(input: CompanyInput): Company
        }
        
`;


module.exports = typeDefs;