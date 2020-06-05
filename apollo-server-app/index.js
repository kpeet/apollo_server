const {ApolloServer} = require('apollo-server');
const jwt = require('jsonwebtoken');
const controller = require('./src/controllers/LoginController');
require('dotenv').config({path: 'variables.env'});


//servidor
const server = new ApolloServer({
    typeDefs:[controller.typeDefs],
    resolvers : [controller.resolvers],
    dataSources: () =>{

        try{
            return {
                SRMAPI: new controller.dataSources(),
            };

        }catch(error){
            console.log("dataSources ERROR");
            console.log(error);
            throw error
        }

    },
    context: ({req}) => {
        const token = req.headers['autorization'] || '';
        //TODO: Modificar implementacion de headers=> refresc, access token
        if(token){
            try{
                const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRETA)
                console.log(usuario);
                return {
                    usuario
                }

            }catch(error){
                console.log('Error en validacion de token');
                console.log(error)
            }
        }

    }
});

//arrancar el servidor
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`Servidor listo en la url ${url}`)

})
