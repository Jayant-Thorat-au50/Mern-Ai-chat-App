import { configureStore } from "@reduxjs/toolkit";
import AuthSlice  from "./Slices/AuthSlice.jsx";
import projectSlice from "./Slices/Projectslices.js";


const store = configureStore({
  reducer: {
    authState : AuthSlice,
    projectstate: projectSlice

},
});

export default store