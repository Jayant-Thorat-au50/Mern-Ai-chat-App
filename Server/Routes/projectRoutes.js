import express from "express";
import {
  addUsersToProject,
  createProjectController,
  deleteProject,
  getAllProjects,
  getProject,
  RemoveUsersFromProject,
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

projectsRoutes.put(
  "/addUsersInProject",
  body("users").isArray().withMessage("Users are required"),
  body("projectId").isString().withMessage("Project ID is required"),
  jwtAuth,
  addUsersToProject
);
projectsRoutes.delete(
  "/remove-users",
  body("users").isArray().withMessage("Users are required"),
  body("projectId").isString().withMessage("Project ID is required"),
  jwtAuth,
  RemoveUsersFromProject
);

projectsRoutes.post("/get-project/:projectId", jwtAuth, getProject);
projectsRoutes.get("/delete-project", jwtAuth, deleteProject);
export default projectsRoutes;
