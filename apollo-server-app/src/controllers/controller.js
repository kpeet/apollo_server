const resolvers  = require('./../resolvers/resolvers');
const  typeDefs  = require('./../typeDefs/schema');
const  SRMAPI = require('../models/models');

//Controller
const controller = {
    resolvers,
    "typeDefs": typeDefs,
    "dataSources" : SRMAPI
}


module.exports = controller;
