import express from "express";
import {
  addUsersToProject,
  createProjectController,
  getAllProjects,
} from "../Controller/projectController.js";
import { body } from "express-validator";
import { jwtAuth } from "../Middlewares/jwtAuth.js";

const projectsRoutes = express.Router();

projectsRoutes.post(
  "/create",
  body("name").isString().withMessage("Name is required"),
  jwtAuth,
  createProjectController
);

projectsRoutes.get("/allProjects", jwtAuth, getAllProjects);

projectsRoutes.put("/addUsersInProject", jwtAuth, addUsersToProject);
export default projectsRoutes;
