import axios from "axios";

let baseURL;

// if(process.env.NODE_ENV === "production") {
  baseURL = "https://mern-ai-chat-app-1vdd.onrender.com/api/v1";
// }else{
  // baseURL = "http://localhost:8080/api/v1";
// }

const axiosInstance = axios.create({

  baseURL: baseURL
});


axios.defaults.withCredentials = true;

export default axiosInstance;
