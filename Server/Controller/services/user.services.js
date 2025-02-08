import UserModel from "../../Models/UserModel.js";

export const signUp = async ({email, password}) => {

   // its taking the email and password from the req.body
    if(!email || !password){
       throw new Error('Email and password are required')
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