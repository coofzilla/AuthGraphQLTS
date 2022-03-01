import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mongoURI, sessionSecret } from "./config/dev";
import passport from "passport";
import schema from "./schema/schema";
import { graphqlHTTP } from "express-graphql";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("CONNECTED TO MONGODB");
  } catch (err) {
    console.log("ERROR CONNECTING", err);
  }
})();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: sessionSecret,
    store: new MongoStore({
      mongoUrl: mongoURI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("LISTENING ON 4000");
});
