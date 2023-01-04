import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL:
  //   'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway/api',
  baseURL: 'http://localhost:5000/api', // localhost
});

export default axiosInstance;
