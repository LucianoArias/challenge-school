const prisma = require('../utils/client');

const create = async (firstName, lastName, age, courseId, userId) => {
  try {
    const newStudent = await prisma.student.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        age: age,
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newStudent;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getStudentByCourse = async (course, user) => {
  try {
    const student = await prisma.student.findMany({
      where: {
        courseId: course,
        userId: user,
      },
      select: {
        title: true,
        firstName: true,
        lastName: true,
        age: true,
      },
    });

    return student;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllStudents = async (user) => {
  try {
    const allStudents = await prisma.student.findMany({
      where: {
        userId: user,
      },
    });
    return allStudents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const editStudent = async (id, firstName, lastName, age, courseId, userId) => {
  try {
    const student = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        age: age,
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// para eliminar un gasto
const deleteStudent = async (id) => {
  try {
    const student = await prisma.student.delete({
      where: {
        id: id,
      },
    });
    return student;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  create,
  getStudentByCourse,
  getAllStudents,
  editStudent,
  deleteStudent,
};
