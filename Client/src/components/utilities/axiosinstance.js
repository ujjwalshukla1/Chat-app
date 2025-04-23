
import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL : "https://chat-backend-h0qf.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }, 
});

export default axiosInstance;