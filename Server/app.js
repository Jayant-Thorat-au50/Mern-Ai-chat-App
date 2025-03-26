import { config } from "dotenv";
config()
import express from 'express'
import morgan from "morgan";
import dbConnect from "./dbConnect.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
dbConnect();

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/project', projec)

export default app;