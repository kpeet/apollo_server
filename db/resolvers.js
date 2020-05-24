const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');



const crearToken = (usuario, secreta, expiracion){

}
//Resolvers
const resolvers = {
    Query: {
        obtenerCursos: () => "Algo"
    },
    Mutation: {
        nuevoUsuario: async (_, {input}) => {

            const { email, password} = input;

            //Revisa si el usuario está registrado

            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario){
                throw new Error('El usuario ya está registrado')
            }



            //Hashear su password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);


            try{
                //Guardarlo en la base de datos

                const usuario = new Usuario(input);
                usuario.save();//guardarlo
                return usuario;

            }catch(error){
                console.log(error);
                console.log("FLAG 5");

            }








             return "Creando ....";
        },

        autenticarUsuario: async (_ , {input})=>{

            const {email, password} = input;

            /Si existe usuario
            const existeUsario = await Usuario.findOne({email});
            if(!existeUsario){
                throw new Error('el usuario no existe')
            }

            //Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsario.password);
            if(!passwordCorrecto){
                throw new Error('el password es incorrecto')
            }

            //crear el token

            return {
                token: crearToken(existeUsario, process.env.SECRETA, '24h')
            }
        }
    }

}



module.exports = resolvers;