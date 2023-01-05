import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditStudentModal from '../Modals/EditStudentModal';
import '../../styles/Card.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {
  deleteStudentAction,
  updateStudentAction,
} from '../../Redux/slices/student';

const Card = ({ id, firstName, lastName, age, course }) => {
  const courses = useSelector((store) => store.course.coursesList);
  const token = useSelector((store) => store.auth.token);

  const [isEditStudentModalIsOpen, setEditStudentModalIsOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newAge, setNewAge] = useState(age);
  const [newCourse, setNewCourse] = useState(course);

  const dispatch = useDispatch();

  const deleteStudent = () => {
    dispatch(deleteStudentAction(id, token));
  };

  const editStudent = () => {
    setEditStudentModalIsOpen(true);
    dispatch(
      updateStudentAction(
        id,
        newFirstName,
        newLastName,
        newAge,
        newCourse,
        token
      )
    );
    setEditStudentModalIsOpen(false);
  };

  const handleChangeFirstName = (e) => {
    setNewFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setNewLastName(e.target.value);
  };

  const handleChangeAge = (e) => {
    setNewAge(+e.target.value);
  };

  const handleChangeCourse = (e) => {
    setNewCourse(parseInt(e.target.value));
  };

  return (
    <div className="card__wraper">
      <div className="icons__wraper">
        <div className="card__icons">
          <FiEdit
            className="card__icon--edit"
            onClick={() => setEditStudentModalIsOpen(true)}
          />
          <AiOutlineClose
            className="card__icon--delete"
            onClick={deleteStudent}
          />
        </div>
      </div>
      <div className="title__container">
        <h2 className="card__category">{course}</h2>
        <h1 className="card__title">{firstName}</h1>
        <h1 className="card__title">{lastName}</h1>
      </div>
      <p className="card__amount">{age} años</p>

      <EditStudentModal
        open={isEditStudentModalIsOpen}
        onClose={() => setEditStudentModalIsOpen(false)}
      >
        <div className="modal__body">
          <input
            className="modal__input"
            type="text"
            placeholder="First Name"
            defaultValue={firstName}
            onChange={handleChangeFirstName}
            required
          />

          <input
            className="modal__input"
            type="text"
            placeholder="Last Name"
            defaultValue={lastName}
            onChange={handleChangeLastName}
            required
          />

          <input
            className="modal__input"
            type="number"
            placeholder="Age"
            defaultValue={age}
            onChange={handleChangeAge}
            required
          />

          <select
            className="select"
            onChange={handleChangeCourse}
            value={course?.id}
            required
          >
            <option selected disabled hidden>
              Select Course
            </option>
            {courses.map((course, index) => (
              <option key={index} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <button className="modal__btn" type="button" onClick={editStudent}>
            Submit
          </button>
        </div>
      </EditStudentModal>
    </div>
  );
};

export default Card;
