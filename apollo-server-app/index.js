const {ApolloServer} = require('apollo-server');
const typeDefs = require('./src/typeDefs/schema');
const resolvers = require('./src/resolvers/resolvers');
const jwt = require('jsonwebtoken');

const controller = require('./src/controllers/controller');

console.log("controller")
console.log(JSON.stringify(controller))
console.log(controller)
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
            console.log("ERROR");
            console.log(error);
            return {
                SRMAPI: new controller.dataSources(),
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
