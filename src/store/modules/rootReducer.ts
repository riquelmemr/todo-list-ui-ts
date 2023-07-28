import { combineReducers } from '@reduxjs/toolkit';

import postsSlice from './posts/postsSlice';
import userLoggedSlice from './userLogged/userLoggedSlice';

const rootReducer = combineReducers({
	userLogged: userLoggedSlice,
	posts: postsSlice,
});

export default rootReducer;
