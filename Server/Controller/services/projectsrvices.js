import mongoose from "mongoose";
import ProjectModel from "../../Models/ProjectModel.js";

export const createProject = async ({ name, userId }) => {
  try {
    const newProject = await ProjectModel.create({
      name: name,
      users: userId,
    });
    return await newProject.save();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsersProjects = async ({ userId }) => {
  if (!userId) {
    throw new Error("userId is required");
  }

  const AllUsersProjects = await ProjectModel.find({ users: userId });

  return AllUsersProjects;
};

export const addUserInProject = async ({ userId, projectId, users }) => {
  console.log(users);

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project id");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
    users: userId,
  });

  if (!project) {
    throw new Error("user do not belogs to this project");
  }

  // updating the project
  const updatedProject = await ProjectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );

  return updatedProject.populate("users");
};

export const getProjectdetails = async ({ projectId: projectId }) => {
  if (!projectId) {
    throw new Error("project Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project Id");
  }

  const project = await ProjectModel.findById(projectId).populate("users");

  return project;
};

export const deleteProjectService = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("project Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project Id");
  }

  const project = await ProjectModel.findByIdAndDelete(projectId);

  return project;
};

export const removeUsers = async ({users, projectId}) => {
  if (!projectId) {
    throw new Error("project Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project Id");
  }

  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId },
    { $pull: { users: { $in: users } } },
    { new: true }
  );

  return project;
}