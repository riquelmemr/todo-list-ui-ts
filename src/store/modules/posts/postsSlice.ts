import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { Post, SetPost } from '../../../types/post';

const initialState: Post = {
	id: '',
	title: '',
	body: '',
};

export const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPost: (state, action: PayloadAction<SetPost>) => {
			return {
				id: new Date().getTime().toString(),
				title: action.payload.title,
				body: action.payload.body,
			};
		},
		deletePost: () => {
			return initialState;
		},
	},
});

export const { setPost, deletePost } = postsSlice.actions;
export const selectPost = (state: RootState) => state.posts;
export default postsSlice.reducer;
