import { combineReducers } from '@reduxjs/toolkit';

import usersSlice from './users/usersSlice';

const rootReducer = combineReducers({
	users: usersSlice,
});

export default rootReducer;
