import express from "express";
import { createProjectController } from "../Controller/projectController.js";
import { body } from "express-validator";
import { jwtAuth } from "../Middlewares/jwtAuth.js";

const projectsRoutes = express.Router();

projectsRoutes.post(
  "/create",
  jwtAuth,
  body("name").isString().withMessage("Name is required"),
  createProjectController
);
export default projectsRoutes;
