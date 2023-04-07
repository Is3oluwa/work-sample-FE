import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://work-sample-api.onrender.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // assuming the token is stored in local storage
  if (token) {
    console.log("token dey")
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

