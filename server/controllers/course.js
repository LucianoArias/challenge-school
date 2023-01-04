const course = require('../models/course');

const create = async (req, res) => {
  try {
    const title = req.body.title;
    const newCourse = await course.create(title);
    res.send(newCourse);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const allCourses = await course.findAll();
    res.send(allCourses);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedCourse = await course.deleteCourseById(id);
    res.send(deletedCourse);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const title = req.body.title;

    const updatedCourse = await course.editCourse(id, title);
    res.send(updatedCourse);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

module.exports = { create, findAll, deleteCourse, updateCourse };
