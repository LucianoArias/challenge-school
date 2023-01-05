import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://challenge-school-production.up.railway.app/api',
  // baseURL: 'http://localhost:5000/api', // localhost
});

export default axiosInstance;
