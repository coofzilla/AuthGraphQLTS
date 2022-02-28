"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => {
    User_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Invalid Credentials" });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { message: "Invalid credentials." });
        });
    });
}));
function signup({ email, password, req }) {
    const user = new User_1.User({ email, password });
    if (!email || !password) {
        throw new Error("You must provide an email and password.");
    }
    return User_1.User.findOne({ email })
        .then((existingUser) => {
        if (existingUser) {
            throw new Error("Email in use");
        }
        return user.save();
    })
        .then((user) => {
        return new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });
        });
    });
}
function login({ email, password, req }) {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate("local", (err, user) => {
            if (!user) {
                reject("Invalid credentials.");
            }
            req.login(user, () => resolve(user));
        })({ body: { email, password } });
    });
}
exports.default = { login, signup };
