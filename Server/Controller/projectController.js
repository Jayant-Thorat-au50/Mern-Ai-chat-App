import { validationResult } from "express-validator";
import projectmodel from "../Models/ProjectModel.js";
import {
  addUserInProject,
  createProject,
  getAllUsersProjects,
  getProjectdetails,
  deleteProjectService
} from "./services/projectsrvices.js";
import mongoose from "mongoose";

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
    const validate = validationResult(req.body);

    if (!validate.isEmpty()) {
      return res.status(400).json({ success: false, errors: validate.array() });
    }

    const { users, projectId } = req.body;
    const { id } = req.user;

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
      success: false,
      errors: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await getProjectdetails({ projectId: projectId });

   return res.status(200).json({
      success: true,
      project: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await deleteProjectService({ projectId: projectId });

    res.status(200).json({
      success: true,
      message: 'project deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
