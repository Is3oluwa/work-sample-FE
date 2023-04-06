import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://work-sample-be.onrender.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      "https://642dda3a4ae7d42755fe75d3--work-sample-ecommerce.netlify.app",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming the token is stored in local storage
  if (token) {
    console.log("token dey");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
