import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL:
  // 'mysql://root:aUkPjIpQFRWTYYYDFWZ3@containers-us-west-159.railway.app:7466/railway', // mi backend
  baseURL: 'http://localhost:5000/api', // localhost
});

export default axiosInstance;
