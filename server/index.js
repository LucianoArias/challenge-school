require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(cors());

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'https://challenge-school.vercel.app/'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(cors(corsOptions));

const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const authRouter = require('./routes/auth');

app.use('/api/students', studentRouter);
app.use('/api/course', courseRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.statusCode = 404;
  res.send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`);
});
