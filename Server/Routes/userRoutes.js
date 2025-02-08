import { Router } from "express";
import { signUpController } from "../Controller/UserController.js";
import { body } from "express-validator";

const userRoutes = Router();

userRoutes.post('/register', 
    body('email').isEmail().withMessage("invalied email"),
    body('password').isLength({min:3}).withMessage("password must be at least 3 charactres long"),
    signUpController
)

userRoutes.post('/', (req,res)=> res.send('kkkkkkkkkk'))



export default userRoutes;
