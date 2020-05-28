const {ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const jwt = require('jsonwebtoken');
const SRMAPI = require('./models/CompanyRest');
require('dotenv').config({path: 'variables.env'});
const conectarDB = require('./config/db');


//Conectar a la base de datos
conectarDB();

//servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        console.log("SRMAPI")
        try{
            return {
                SRMAPI: new SRMAPI(),
            };

        }catch(error){
            console.log("ERROR");
            console.log(error);
            return {
                SRMAPI: new SRMAPI(),
            };
        }

    },
    context: ({req}) => {
        console.log("Por Aqui");
        const token = req.headers['autorization'] || '';
        if(token){
            try{
                const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRETA)
                console.log(usuario);
                return {
                    usuario
                }

            }catch(error){
                console.log('Hubo un error');
                console.log(error)
            }
        }
        console.log(token);

    }
});


//arrancar el servidor
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`Servidor listo en la url ${url}`)

})