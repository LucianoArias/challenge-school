import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import AddStudentModal from '../../components/Modals/AddStudentModal';
import '../../styles/Dashboard.css';
import '../../styles/Global.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { showAllStudentsAction } from '../../Redux/slices/student';
import { showAllCoursesAction } from '../../Redux/slices/course';

const Dashboard = () => {
  const [searchvalue, setSearchValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('All');
  const [isModalOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((store) => store.auth.token);
  const students = useSelector((store) => store.students.studentsList);
  const courses = useSelector((store) => store.course.coursesList);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toUpperCase());
  };

  const handleDropdown = (e) => {
    let courseId = e.target.value;
    setDropdownValue(courseId);
    if (courseId !== 'All') {
      dispatch((courseId, token));
    }
  };

  const addStudent = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (token) {
      dispatch(showAllStudentsAction(token));
      dispatch(showAllCoursesAction());
    }
  }, [token]);

  useEffect(() => {
    handleDropdown({ target: { value: dropdownValue } });
    dispatch(showAllStudentsAction(token));
  }, [JSON.stringify(students)]);

  return (
    <section className="dashboard__section">
      <div className="search__wraper">
        <input
          type="text"
          placeholder="Search Students"
          className="searchbar"
          onChange={handleSearch}
        />
        <div className="select__wraper">
          <p className="sort__title">Sort by Course</p>
          <select className="select" onChange={handleDropdown}>
            <option value="All">All</option>
            {courses?.map((course, index) => (
              <option key={index} value={course.id} id={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cards__container">
        {[...students]
          .filter((e) =>
            dropdownValue === 'All'
              ? e.firstName.toUpperCase().includes(searchvalue)
              : e.firstName.toUpperCase().includes(searchvalue) &&
                e.courseId == dropdownValue
          )
          .map((e, index) => (
            <Card
              key={index}
              id={e.id}
              firstName={e.firstName}
              lastName={e.lastName}
              title={e.title}
              course={courses[e.courseId - 1]?.title}
              age={e.age}
            />
          ))}
      </div>

      <div className="add__wraper">
        <AiOutlinePlus className="add__icon" onClick={addStudent} />
      </div>

      <AddStudentModal
        open={isModalOpen}
        onClose={() => setModalIsOpen(false)}
      ></AddStudentModal>
    </section>
  );
};

export default Dashboard;
