const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



const crearToken = (usuario, secreta, expiresIn) => {
    console.log(usuario);
    const {id, email, nombre, apellido} = usuario;


    return jwt.sign({id, email, nombre, apellido}, secreta,{expiresIn})

}


//Resolvers
const resolvers = {
    Query: {
        obtenerUsuario: async(_, {token}) =>{
            const usuarioId =  jwt.verify(token,process.env.SECRETA )

            return usuarioId
        }
    },
    Mutation: {
        nuevoUsuario: async (_source, { input }, { dataSources }) => {

            const  { nombre, apellido, email, password} = input;

            try{
                const result = await dataSources.SRMAPI.userRegister(nombre, apellido, email, password);
                return result;

            }catch(error){
                console.log(error);
                throw error;

            }
        },

        autenticarUsuario: async (_source, { input }, { dataSources }) => {
            const {email, password} = input;

            const result = await dataSources.SRMAPI.login(email, password);

            return result;
        },

    }

}



module.exports = resolvers;
