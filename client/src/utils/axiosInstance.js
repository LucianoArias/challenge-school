import axios from 'axios';

const url = require('url');

let DATABASE_URL = url.parse(
  'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway/api'
);
DATABASE_URL.protocol = 'https:';
console.log(DATABASE_URL.protocol);

const axiosInstance = axios.create({
  DATABASE_URL:
    'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway/api',

  // baseURL: 'http://localhost:5000/api', // localhost
});
console.log(DATABASE_URL);

export default axiosInstance;
