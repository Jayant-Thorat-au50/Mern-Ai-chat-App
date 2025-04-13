import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must not be longer than 50 characters"],
  },

  password: {
    type: String,
    select: false,
  },
});

userSchema.pre("save", async function () {
  return await bcrypt.hash(this.password, 10);
});

// userSchema.statics.hashPassword = async function (password){
//  return this.password = await bcrypt.hash(password, 10)
// }

userSchema.methods = {
  JwtToken() {
    return JWT.sign(
      { email: this.email, id: this._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },
};

const UserModel = model("users", userSchema);

export default UserModel;
