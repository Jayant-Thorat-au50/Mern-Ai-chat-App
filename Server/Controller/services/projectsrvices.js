
import ProjectModel from "../../Models/ProjectModel.js";

export const createProject = async ({name, userId}) => {
  try {
    const newProject = await ProjectModel.create({
        name:name,
        users:userId
    })
    return await newProject.save();
  } catch (error) {
    throw new Error(error);
  }
}   

export const getAllUsersProjects = async ({userId}) => {

  if(!userId){
    throw new Error('userId is required')
  }

  const AllUsersProjects = await ProjectModel.find({users:userId});

  return AllUsersProjects;
}
