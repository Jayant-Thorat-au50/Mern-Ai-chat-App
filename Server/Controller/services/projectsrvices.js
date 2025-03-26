
import ProjectModel from "../../Models/ProjectModel.js";

export const createProject = async ({name, userId}) => {
  try {
    const newProject = await ProjectModel.create({
        name:name,
        userId:userId
    })
    return await newProject.save();
  } catch (error) {
    throw new Error(error);
  }
}   

