import { Router } from "express";
import { generateDataContent } from "../Controller/ai.controllers.js";

const aIroutes = Router();

aIroutes.get('/get-result', generateDataContent);

export default aIroutes;
