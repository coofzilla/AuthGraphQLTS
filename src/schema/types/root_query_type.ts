import { GraphQLObjectType } from "graphql";

import { UserType } from "./user_type";

export const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //if user, authenticated, else null
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});
