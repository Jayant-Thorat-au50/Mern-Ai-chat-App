import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import store from "./Redux/Store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const toastOptions = {
  position:"top-center",
  duration:'120',
  style:{
    color:'black',
    borderRadius:'2px',
  },
  success:{
    style:{
      color:'green'
    }
  },
  error:{
    style:{
      color:'red'
    }
  },

}

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster toastOptions={toastOptions} />
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
