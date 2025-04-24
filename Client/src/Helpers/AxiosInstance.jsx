import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/api/v1",
  baseURL: "https://mern-ai-chat-app-1vdd.onrender.com/api/v1",
});


axios.defaults.withCredentials = true;

export default axiosInstance;
