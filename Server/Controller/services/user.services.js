import { validationResult } from "express-validator";
import UserModel from "../../Models/UserModel.js";

export const signUp = async ({email, password}) => {

   // its taking the email and password from the req.body
    if(!email || !password){
       throw new Error('Email and password are required')
    }

    // cheking the user exists or not
      const userExists = await UserModel.findOne({email:email});
      if(userExists){
         throw new Error('User already')
      }

   // hashing the password
   const hashPassword = await UserModel.hashPassword(password)

    // creating the user instance
    const user = await UserModel.create({
       email:email,
       password:hashPassword
    });
   
    return user;
   
   } 
