import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'http://localhost:5000/api', // localhost
});

export default axiosInstance;
