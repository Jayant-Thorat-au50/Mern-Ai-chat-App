import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstace from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
 projectsList:[]
};

export const createProject = createAsyncThunk(
  "project/create",
  async (data) => {
    try {
      const response = axiosinstace.post("/project/create", data , {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      toast.promise(response, {
        loading: "Creating your project",
        success: () => {
          return "Project created successfully!";
        },
        error: "Failed to create project",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.errors);
      return error.response.data.errors;
    }
  }
);
export const getAllProjects = createAsyncThunk(
  "project/getAll",
  async () => {
    try {
      const response = axiosinstace.get("project/allProjects", {
        headers:{
          token:JSON.parse(localStorage.getItem('token'))
        }
      });

      toast.promise(response, {
        loading: "fetching all projects",
        success: () => {
          return "Projects fetched successfully!";
        },
        error: "Failed to get all project",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

const projcetSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export default projcetSlice.reducer;
