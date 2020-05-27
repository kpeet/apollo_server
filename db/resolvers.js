const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
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
            const usuarioId = await jwt.verify(token,process.env.SECRETA )

            return usuarioId
        }
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

            //Si existe usuario
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
        },
        nuevoProducto: async (_, {input}) => {
            try{
                const producto = new Producto(input);

                //Almacenar en db
                const resultado = await producto.save();


                return resultado;
            }catch(error){

            }
        }
    }

}



module.exports = resolvers;