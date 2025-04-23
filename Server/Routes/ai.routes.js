import { Router } from "express";
import { generateDataContent } from "../Controller/ai.controllers.js";

const routes = Router();

routes.get('/get-result', generateDataContent);

export default routes;
