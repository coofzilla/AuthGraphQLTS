"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String },
    password: { type: String },
});
UserSchema.pre("save", function save(next) {
    const user = this;
    //if haven't modified pw, don't try salt anything return
    if (!user.isModified("password"))
        return next();
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
