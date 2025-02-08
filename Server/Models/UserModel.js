import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken'

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

userSchema.statics.hashPassword = async function (password){
  return await bcrypt.hash(password, 10)
}

userSchema.methods = {
  JwtToken() {
    return JWT.sign(
      {email: this.email} ,process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },
};


const UserModel = model('user', userSchema)

export default UserModel;