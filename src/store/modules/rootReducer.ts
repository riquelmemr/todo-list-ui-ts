import { combineReducers } from '@reduxjs/toolkit';

import notificationsSlice from './notifications/notificationsSlice';
import tasksSlice from './tasks/tasksSlice';
import usersSlice from './users/usersSlice';

const rootReducer = combineReducers({
	users: usersSlice,
	tasks: tasksSlice,
	notifications: notificationsSlice,
});

export default rootReducer;
