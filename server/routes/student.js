const express = require('express');
const studentController = require('../controllers/student');
const isLogged = require('../middlewares/authorization').userLoggedIn;

const router = express.Router();

router.post('/add', isLogged, studentController.addStudent);

router.get('/all', isLogged, studentController.showAll);

router.get('/search', isLogged, studentController.searchByCourse);

router.patch('/edit/:id', isLogged, studentController.updateStudent);

router.delete('/delete/:id', isLogged, studentController.deleteStudent);

module.exports = router;
