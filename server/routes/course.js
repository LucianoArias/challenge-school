const express = require('express');
const courseController = require('../controllers/course');
const isAdmin = require('../middlewares/authorization').authorizeAdmin;

const router = express.Router();

router.post('/add', isAdmin, courseController.create);

router.get('/all', courseController.findAll);

router.patch('/edit/:id', isAdmin, courseController.updateCourse);

router.delete('/delete/:id', isAdmin, courseController.deleteCourse);

module.exports = router;
