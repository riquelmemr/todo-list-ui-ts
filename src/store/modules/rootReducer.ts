import { combineReducers } from '@reduxjs/toolkit';

import userLoggedSlice from './userLogged/userLoggedSlice';

const rootReducer = combineReducers({
	userLogged: userLoggedSlice,
});

export default rootReducer;
