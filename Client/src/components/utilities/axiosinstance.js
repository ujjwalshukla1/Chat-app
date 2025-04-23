
import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL : "http://localhost:10000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }, 
});

export default axiosInstance;