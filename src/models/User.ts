import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
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

export const UserModel = model<User>("User", UserSchema);
