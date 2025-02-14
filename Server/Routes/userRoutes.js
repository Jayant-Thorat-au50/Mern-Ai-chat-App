import { Router } from "express";
import { getProfile, loginController, logout, signUpController } from "../Controller/UserController.js";
import { body } from "express-validator";
import { jwtAuth } from "../Middlewares/jwtAuth.js";

const userRoutes = Router();

userRoutes.post('/register', 
    body('email').isEmail().withMessage("Invalied email"),
    body('password').isLength({min:3}).withMessage("password must be at least 3 charactres long"),
    signUpController
)

userRoutes.post('/login',
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:3}).withMessage("password must be at least 3 characters long"),
    loginController
)
userRoutes.get('/getUser',
     jwtAuth,
    getProfile
)

userRoutes.get('/logout', logout)

export default userRoutes;
