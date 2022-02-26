import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {
  comparePassword: (
    candidatePassword: string | Buffer,
    callback: (arg0: Error | undefined, arg1: boolean) => void
  ) => void;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  email: { type: String },
  password: { type: String },
});

UserSchema.pre("save", function save(next) {
  const user = this;
  //if haven't modified pw, don't try salt anything return
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string | Buffer,
  callback: (arg0: Error | undefined, arg1: boolean) => void
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch);
  });
};

export const User = mongoose.model<IUserDocument>("User", UserSchema);
