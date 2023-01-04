import React, { useState } from 'react';
import ReactDom from 'react-dom';
import '../../styles/Modal.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addStudentAction } from '../../Redux/slices/student';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

export default function AddStudentModal({ open, children, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [courseId, setCourseId] = useState(-1);
  const courses = useSelector((store) => store.course.coursesList);
  const token = useSelector((store) => store.auth.token);

  const dispatch = useDispatch();

  const createStudent = () => {
    dispatch(addStudentAction(token, firstName, lastName, age, courseId));
    setFirstName('');
    setLastName('');
    setAge(0);
    onClose();
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeAge = (e) => {
    setAge(+e.target.value);
  };

  const handleChangeCourse = (e) => {
    setCourseId(parseInt(e.target.value));
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className="modal__card">
        <div className="modal__header">
          <h2 className="modal__title">Add Student</h2>
          <AiOutlineClose className="close__icon" onClick={onClose} />
        </div>
        <div className="modal__body">
          <input
            className="modal__input"
            type="Text"
            placeholder="First Name"
            value={firstName}
            onChange={handleChangeFirstName}
          />
          <input
            className="modal__input"
            type="Text"
            placeholder="LastName"
            value={lastName}
            onInput={handleChangeLastName}
          />
          <input
            className="modal__input"
            type="Number"
            placeholder="Age"
            onChange={handleChangeAge}
          />
          <select
            className="select"
            defaultValue={'Default'}
            onChange={handleChangeCourse}
          >
            <option value={'Default'} disabled>
              Select Course
            </option>
            {courses.map((course, index) => (
              <option key={index} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <button className="modal__btn" type="submit" onClick={createStudent}>
            Submit
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
