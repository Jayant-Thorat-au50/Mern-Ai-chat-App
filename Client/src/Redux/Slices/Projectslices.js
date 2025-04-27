import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstace from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";
import { CatIcon } from "lucide-react";

const initialState = {
  projectsList: [],
};

export const createProject = createAsyncThunk(
  "project/create",
  async (data) => {
    try {
      const response = axiosinstace.post("/project/create", data, {
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
export const getAllProjects = createAsyncThunk("project/getAll", async () => {
  try {
    const response = axiosinstace.get("project/allProjects", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });

    toast.promise(response, {
      loading: "fetching all projects",
      error: "Failed to get all project",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data.message;
  }
});

export const addUsersToProject = createAsyncThunk(
  "project/add-users",
  async (data) => {
    console.log(data);

    try {
      const response = axiosinstace.put("/project/addUsersInProject", data, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      toast.promise(response, {
        loading: " adding the users!",
        success: () => {
          return "users added successfully!";
        },
        error: "Failed to add the users",
      });

      console.log(response);

      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (data) => {
    try {
      const response = axiosinstace.get("/project/get-project", data, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);
export const getProject = createAsyncThunk(
  "project/getProject",
  async (data) => {
    try {
      const response = axiosinstace.post(`/project/get-project/${data}`, data, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      return (await response).data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const removeUsersFromProjectthunck = createAsyncThunk(
  "project/remove-users",
  async (data) => {
    console.log(data);

    try {
      const response = axiosinstace.delete("/project/remove-users", {
        data,
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      return (await response).data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

const projcetSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projectsList = action.payload.projects;
    });
  },
});

export default projcetSlice.reducer;
