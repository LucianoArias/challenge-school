require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:5000',
      'mysql://root:OauxdFHkeXFvwisy5v5q@containers-us-west-30.railway.app:7611/railway',
    ],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const authRouter = require('./routes/auth');

app.use('/api/students', studentRouter);
app.use('/api/course', courseRouter);
app.use('/api/auth', authRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.use((req, res) => {
  res.statusCode = 404;
  res.send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`);
});
