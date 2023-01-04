import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    studentsList: [],
  },
  reducers: {
    showAllStudents: (state, action) => {
      state.studentsList = action.payload.map((student) => {
        return {
          ...student,
        };
      });
    },

    addStudent: (state, action) => {
      state.studentsList.push(action.payload);
    },

    updateStudent: (state, action) => {
      return {
        ...state,
        studentsList: state.studentsList.map((student) => {
          if (student.id === action.payload.id) {
            return action.payload;
          } else {
            return student;
          }
        }),
      };
    },

    deleteStudent: (state, action) => {
      const foundIndex = state.studentsList.findIndex(
        (student) => student.id === action.payload
      );
      state.studentsList.splice(foundIndex, 1);
    },
  },
});

export const { showAllStudents, addStudent, updateStudent, deleteStudent } =
  studentsSlice.actions;
export default studentsSlice.reducer;

// ACTIONS
export const showAllStudentsAction = (token) => async (dispatch) => {
  try {
    if (token) {
      const response = await axiosInstance.get('/students/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(showAllStudents(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addStudentAction =
  (token, firstName, lastName, age, course) => async (dispatch) => {
    try {
      if (token) {
        const response = await axiosInstance.post(
          '/students/add',
          { firstName, lastName, age, course },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(addStudent(response.data));
        const notify = () => toast('✔️ New student added');
        notify();
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast('❌ Error adding student');
      notify();
    }
  };

export const deleteStudentAction = (id, token) => async (dispatch) => {
  try {
    if (token) {
      const response = await axiosInstance.delete(`/students/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const notify = () => toast('✔️ Student deleted');
      notify();
      return dispatch(deleteStudent(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateStudentAction =
  (id, firstName, lastName, age, course, token) => async (dispatch) => {
    try {
      if (token) {
        const response = await axiosInstance.patch(
          `/students/edit/${id}`,
          { firstName, lastName, age, course },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const notify = () => toast('✔️ Student updated');
        notify();
        return dispatch(updateStudent(response.data));
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast('❌ Error updating student');
      notify();
    }
  };
