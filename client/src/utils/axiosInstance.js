import axios from 'axios';

const url = require('url');

// let DATABASE_URL = url.parse(
//   'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway/api'
// );
// DATABASE_URL.protocol = 'https:';
// console.log(DATABASE_URL.protocol);

const axiosInstance = axios.create({
  REACT_APP_BASE_URL: 'https://challenge-school-production.up.railway.app/',

  // baseURL: 'http://localhost:5000/api', // localhost
});
// console.log(DATABASE_URL);

export default axiosInstance;
