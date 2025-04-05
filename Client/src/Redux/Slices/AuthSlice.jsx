import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
  user: localStorage.getItem("user") || {},
  isLoggedIn: localStorage.getItem("isLoggedIn") || null,
  token: localStorage.getItem("token") || null,
  role: "",
  AllUsersList:[]
};

export const signUp = createAsyncThunk("/user/register", async (data) => {
  try {
    const response = axiosInstance.post("/user/register", data);

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

export const deleteAllusers = createAsyncThunk("/users/delete", async () => {
  try {
    const response = await axiosInstance.delete("/user/delete");

    console.log(response);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const login = createAsyncThunk("/user/login", async (data) => {
  try {
    const response = axiosInstance.post("/user/login", data);

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

export const getProfile = createAsyncThunk("/user/get-profile", async () => {
  try {
    const response = await axiosInstance.get("/user/getUser", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      }
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    const response = await axiosInstance.get("/user/logout", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getAllUsers = createAsyncThunk('/users/all', async () => {
  try {
      const response = await axiosInstance.get('/user/allUsers' , {
        headers:{
          token:JSON.parse(localStorage.getItem('token'))
        }
      });
      return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data.message;
  }
})

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.User;
        state.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload.User));
        localStorage.setItem("isLoggedIn", true),
          localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("isLoggedIn", true);
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        console.log(action.payload);
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log(action);
        state.AllUsersList = action.payload.allUsers
      })
      
  },
});

export default AuthSlice.reducer;
