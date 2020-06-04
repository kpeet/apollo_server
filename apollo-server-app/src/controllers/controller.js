const { resolvers } = require('./../resolvers/resolvers');
const { typeDefs } = require('./../typeDefs/schema');


//Controller
const controller = {
    "resolvers ":resolvers,
    "typeDefs": typeDefs
}


module.exports = controller;
