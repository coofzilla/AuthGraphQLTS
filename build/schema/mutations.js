"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const graphql_1 = require("graphql");
const user_type_1 = require("./types/user_type");
const auth_1 = __importDefault(require("../services/auth"));
exports.mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: user_type_1.UserType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve(parentValue, { email, password }, req) {
                return auth_1.default.signup({ email, password, req });
            },
        },
        logout: {
            type: user_type_1.UserType,
            resolve(parentValue, args, req) {
                const { user } = req;
                req.logout();
                return user;
            },
        },
        login: {
            type: user_type_1.UserType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve(parentValue, { email, password }, req) {
                return auth_1.default.login({ email, password, req });
            },
        },
    },
});
