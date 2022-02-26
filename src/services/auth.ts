import { User } from "../models/User";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

//define user f/Express.User
declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Invalid Credentials" });
      }
      user.comparePassword(password, (err: any, isMatch: any) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid credentials." });
      });
    });
  })
);

function signup({ email, password, req }: any) {
  const user = new User({ email, password });
  if (!email || !password) {
    throw new Error("You must provide an email and password.");
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email in use");
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.logIn(user, (err: any) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

function login({ email, password, req }: any) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user) => {
      if (!user) {
        reject("Invalid credentials.");
      }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

export { login, signup };
