"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("./user_type");
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: user_type_1.UserType,
            resolve(parentValue, args, req) {
                return req.user;
            },
        },
    },
});
