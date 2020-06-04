const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


const conectarDB = async ()=> {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            userNewUrlParse: true,
            useUnifieldTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        });


    }catch (error){
        console.log("Error en connexion de DB")
        console.log(error)
        process.exit(1);

    }
}


module.exports = conectarDB;
