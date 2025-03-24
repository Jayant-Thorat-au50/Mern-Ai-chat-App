import axios from 'axios'

const axiosinstace = axios.create();



axiosinstace.defaults.baseURL = 'http://localhost:8080/api/v1';
axios.defaults.withCredentials = true

export default axiosinstace