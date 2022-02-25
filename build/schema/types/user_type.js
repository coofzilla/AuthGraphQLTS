"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "UserType",
    fields: {
        id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
    },
});
