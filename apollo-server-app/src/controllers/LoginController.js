const resolvers  = require('./../resolvers/resolvers');
const  typeDefs  = require('../typeDefs/LoginSchema');
const  SRMAPI = require('../models/ApiSrmModels');

//Controller

const controller = {
    "resolvers":resolvers,
    "typeDefs": typeDefs,
    "dataSources" : SRMAPI
}


module.exports = controller;
