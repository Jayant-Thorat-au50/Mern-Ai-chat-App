import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstace from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
  user: "",
  isLoggedIn: "",
  role: "",
};

export const signUp = createAsyncThunk("/user/register", async (data) => {
  try {
    const response = axiosinstace.post("/user/register", data);

    toast.promise(response, {
      loading: "Creating your account...!",
      success: () => {
        return "Account created successfully!";
      },
      error: "Failed to create account",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.errors);
    return error.response.data;
  }
});

export const deleteAllusers = createAsyncThunk('/users/delete', async () => {
  try {
    const response = await axiosinstace.delete('/user/delete')

    console.log(response);
    
    return response.data
  } catch (error) {
    return error.response.data;
  }
})

export const login = createAsyncThunk("/user/login", async (data) => {
  try {
    const response = axiosinstace.post("/user/login", data);

    toast.promise(response, {
      loading: "Logging you in...!",
      success: () => {
        return "Logged in successfully!";
      },
      error: "Failed to login",
    });
    return (await response).data;
  } catch (error) {
    console.log(error.response.data.errors[0].msg);
    
    toast.error(error.response.data.errors[0].msg);
    return error.response.data;
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default AuthSlice.reducer;
