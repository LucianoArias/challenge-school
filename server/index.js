require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, 'client')));

app.use((req, res, next) => {
  res.setHeader[('Access-Control-Alow-Origin', '*')];
  res.setHeader[('Access-Control-Alow-Methods', '*')];
  res.setHeader[('Access-Control-Alow-Header', '*')];
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const authRouter = require('./routes/auth');

app.use('/api/students', studentRouter, next);
app.use('/api/course', courseRouter, next);
app.use('/api/auth', authRouter, next);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`);
});
