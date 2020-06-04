const {ApolloServer} = require('apollo-server');
const typeDefs = require('./src/typeDefs/schema');
const resolvers = require('./src/resolvers/resolvers');
const jwt = require('jsonwebtoken');

const conectarDB = require('./config/db');
//Carga de controladores
const controller = require('./src/controllers/controller');


//Conectar a la base de datos
conectarDB();


//servidor
const server = new ApolloServer({
    typeDefs:[controller.typeDefs],
    resolvers : [controller.resolvers],
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
