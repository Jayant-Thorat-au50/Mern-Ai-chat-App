import { config } from "dotenv";
config()
import express, { response } from 'express'
import morgan from "morgan";
import dbConnect from "./dbConnect.js";
import userRoutes from "./Routes/userRoutes.js";


const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
dbConnect();

app.use('/api/v1/user', userRoutes)

export default app;