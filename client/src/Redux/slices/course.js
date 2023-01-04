import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export const courseSlice = createSlice({
  name: 'course',
  initialState: {
    coursesList: [],
  },
  reducers: {
    showAllCourses: (state, action) => {
      state.coursesList = action.payload;
    },

    addCourse: (state, action) => {
      state.coursesList.push(action.payload);
    },

    updateCourse: (state, action) => {
      return {
        ...state,
        coursesList: state.coursesList.map((course) => {
          if (course.id === action.payload.id) {
            return action.payload;
          } else {
            return course;
          }
        }),
      };
    },

    deleteCourse: (state, action) => {
      const foundIndex = state.coursesList.findIndex(
        (course) => course.id === action.payload
      );
      state.coursesList.splice(foundIndex, 1);
    },
  },
});

export const { showAllCourses, addCourse, deleteCourse, updateCourse } =
  courseSlice.actions;
export default courseSlice.reducer;

export const showAllCoursesAction = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/course/all');
    dispatch(showAllCourses(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const addCourseAction = (token, title) => async (dispatch) => {
  try {
    if (token) {
      const response = await axiosInstance.post(
        '/course/add',
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(addCourse(response.data));
      const notify = () => toast('✔️ New Course added');
      notify();
    }
  } catch (error) {
    console.log(error);
    const notify = () => toast('❌ Error adding course');
    notify();
  }
};

export const deleteCourseAction = (id, token) => async (dispatch) => {
  try {
    if (token) {
      const response = await axiosInstance.delete(`/course/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const notify = () => toast('✔️ Course deleted');
      notify();
      return dispatch(deleteCourse(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCourseAction = (id, title, token) => async (dispatch) => {
  try {
    if (token) {
      const response = await axiosInstance.patch(
        `/course/edit/${id}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const notify = () => toast('✔️ Course updated');
      notify();
      return dispatch(updateCourse(response.data));
    }
  } catch (error) {
    console.log(error);
    const notify = () => toast('❌ Error updating course');
    notify();
  }
};
