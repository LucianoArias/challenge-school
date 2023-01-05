import axios from 'axios';

const url = require('url');

let u = url.parse(
  'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway/api'
);
u.protocol = 'https:';
console.log(u.protocol);

const axiosInstance = axios.create({
  u: 'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway/api',

  // baseURL: 'http://localhost:5000/api', // localhost
});
console.log(u);

export default axiosInstance;
