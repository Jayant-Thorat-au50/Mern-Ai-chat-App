import { validationResult } from "express-validator";
import projectmodel from "../Models/ProjectModel.js";
import {
  addUserInProject,
  createProject,
  getAllUsersProjects,
} from "./services/projectsrvices.js";

export const createProjectController = async (req, res) => {
  const validate = validationResult(req.body);
  if (!validate.isEmpty()) {
    return res.status(400).json({ success: false, errors: validate.array() });
  }

  try {
    const { name } = req.body;
    const userId = req.user.id;

    const project = await createProject({ name, userId });

    return res.status(201).json({ success: true, project });
  } catch (error) {
    return res.status(400).json({ success: false, errors: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await getAllUsersProjects({ userId: userId });

    return res.status(200).json({ success: true, projects });
  } catch (error) {
    return res.status(400).json({ success: false, errors: error.message });
  }
};

export const addUsersToProject = async (req, res) => {
 try {
  const { users, projectId } = req.body;
  const { id } = req.user;

  console.log(users);
  console.log(projectId);
  console.log(id);
  

  const project = await addUserInProject({
    userId: id,
    projectId: projectId,
    users: users,
  });

  console.log(project);
  

  return res.status(200).json({
    success: true,
    project: project,
  });
 } catch (error) {
  return res.status(400).json({
    success:false,
    errors:error.message
  })
 }
};
