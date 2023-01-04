const prisma = require('../utils/client');

const create = async (title) => {
  try {
    const newCourse = await prisma.course.create({
      data: {
        title: title,
      },
    });
    return newCourse;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const findAll = async () => {
  try {
    const courses = await prisma.course.findMany();
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteCourseById = async (id) => {
  try {
    const deletedCourse = await prisma.course.delete({
      where: {
        id: id,
      },
    });
    return deletedCourse;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const editCourse = async (id, title) => {
  try {
    const course = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      },
    });
    return course;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { create, findAll, deleteCourseById, editCourse };
