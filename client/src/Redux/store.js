import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import studentsReducer from './slices/student';
import courseReducer from './slices/course';
import usersReducer from './slices/users';

export default configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    course: courseReducer,
    users: usersReducer,
  },
});
