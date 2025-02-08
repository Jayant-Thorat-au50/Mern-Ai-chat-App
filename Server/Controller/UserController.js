import UserModel from "../Models/UserModel.js";
import {validationResult} from 'express-validator'
import * as userServices from  './services/user.services.js'


export const signUpController = async (req,res) => {

    const isError = validationResult(req);

    // if error persists then return error
    if(!isError){
        return res.status(400).json({
            errors:isError.array()
        })
    }

    try {
        
        const user = await userServices.signUp(req.body);

        const token = await user.JwtToken();

        res.cookie('token', token, {httpOnly:true})

         return res.status(201).json({user:user});

    } catch (error) {
        return res.status(400).json(error.message
        )
    }
}