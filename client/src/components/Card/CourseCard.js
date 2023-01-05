import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditStudentModal from '../Modals/EditStudentModal';
import '../../styles/Card.css';
import '../../styles/Global.css';
import { FiEdit } from 'react-icons/fi';
import {
  deleteCourseAction,
  updateCourseAction,
} from '../../Redux/slices/course';
import { IoTrashBinSharp } from 'react-icons/io5';

const CourseCard = ({ id, title }) => {
  const token = useSelector((store) => store.auth.token);

  const [isEditCourseModalOpen, setEditCourseModalIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useDispatch();

  const deleteCourse = () => {
    dispatch(deleteCourseAction(id, token));
  };

  const editCourse = () => {
    setEditCourseModalIsOpen(true);
    dispatch(updateCourseAction(id, newTitle, token));
    setEditCourseModalIsOpen(false);
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div className="category__card">
      <p className="category__id"># {id}</p>
      <p className="category__title">{title}</p>
      <div className="category__icons">
        <FiEdit
          className="edit__icon"
          onClick={() => setEditCourseModalIsOpen(true)}
        />
        <IoTrashBinSharp className="delete__icon" onClick={deleteCourse} />
      </div>

      <EditStudentModal
        open={isEditCourseModalOpen}
        onClose={() => setEditCourseModalIsOpen(false)}
      >
        <div className="modal__body">
          <input
            className="modal__input"
            type="text"
            placeholder="Title"
            defaultValue={title}
            onChange={handleChangeTitle}
            required
          />
          <button className="modal__btn" type="button" onClick={editCourse}>
            Submit
          </button>
        </div>
      </EditStudentModal>
    </div>
  );
};

export default CourseCard;
