import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstace from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  userId: "",
};

export const createProject = createAsyncThunk('project/create', async (data) => {
    try {
        const response = axiosinstace.post('/project/create', data, {
            headers:{
                token:JSON.parse(localStorage.getItem('token'))
            }
        });

        toast.promise(response, {
            loading: 'Creating your project',
            success: () => {
                return 'Project created successfully!';
            },
            error: 'Failed to create project'
        })

        return (await response).data
    } catch (error) {
        toast.error('error.response.data.message')
        return error.response.data.message
    }
})
export const getAllProjects = createAsyncThunk('project/getAll', async (data) => {
    try {
        const response = axiosinstace.post('/project/allProjects', data);

        toast.promise(response, {
            loading: 'Creating your project',
            success: () => {
                return 'Project created successfully!';
            },
            error: 'Failed to create project'
        })

        return (await response).data
    } catch (error) {
        toast.error('error.response.data.message')
        return error.response.data.message
    }
})

const projcetSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export default projcetSlice.reducer;