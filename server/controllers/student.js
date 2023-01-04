const student = require('../models/student');

const addStudent = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const course = req.body.course;
    const user = req.user;
    const newStudent = await student.create(
      firstName,
      lastName,
      age,
      course,
      user.id
    );
    res.send(newStudent);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

// Se busca todos los gastos por categoria
const searchByCourse = async (req, res) => {
  try {
    const course = req.body.course;
    const user = req.user;
    const getStudent = await student.getStudentByCourse(course, user.id);
    res.send(getStudent);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

const showAll = async (req, res) => {
  try {
    const user = req.user;
    const allStudent = await student.getAllStudents(user.id);
    res.send(allStudent);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = req.user;
    const deletedStudent = await student.deleteStudent(id, user.id);
    res.send(deletedStudent);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const course = req.body.course;
    const user = req.user;

    const updatedStudent = await student.editStudent(
      id,
      firstName,
      lastName,
      age,
      course,
      user.id
    );
    res.send(updatedStudent);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send(error.message);
  }
};

module.exports = {
  addStudent,
  searchByCourse,
  showAll,
  deleteStudent,
  updateStudent,
};
