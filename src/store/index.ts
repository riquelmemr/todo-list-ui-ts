import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './modules/rootReducer';

export const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// useDispatch > create a dispatch function of actions to be executed a modified state
// const dispatch = useDispatch();
// dispatch(updateUser({ ... }));

// useSelector > reponsible for accessing the state of the store, and returning a value
// const allUsers = useSelector((state: RootState) => state.users);
