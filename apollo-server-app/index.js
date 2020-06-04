const {ApolloServer} = require('apollo-server');
const jwt = require('jsonwebtoken');
const controller = require('./src/controllers/LoginController');


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

    }
});


//arrancar el servidor
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`Servidor listo en la url ${url}`)

})
