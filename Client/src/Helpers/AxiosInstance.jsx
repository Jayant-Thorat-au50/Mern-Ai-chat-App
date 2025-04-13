import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-ai-chat-app-1vdd.onrender.com/api/v1",
});

axios.defaults.withCredentials = true;

export default axiosInstance;
