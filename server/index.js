require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:5000',
      'https://challenge-school.vercel.app',
    ],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const authRouter = require('./routes/auth');

app.use('/api/students', studentRouter);
app.use('/api/course', courseRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`);
});
