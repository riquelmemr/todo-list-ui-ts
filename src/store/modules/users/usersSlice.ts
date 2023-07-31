/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';

import { api } from '../../../configs/services/api';
import { User, UserLogged } from '../../../types/user';
import { showNotification } from '../notifications/notificationsSlice';

const usersAdapter = createEntityAdapter<User>({
	selectId: (state) => state.email,
});

export const createUser = createAsyncThunk(
	'users/createUser',
	async (user: User, { dispatch }) => {
		try {
			const response = await api.post(`/user/create`, {
				name: user.name,
				email: user.email,
				password: user.password,
			});

			dispatch(
				showNotification({
					success: true,
					status: response.data.status,
				}),
			);

			return response.data;
		} catch (error: any) {
			dispatch(
				showNotification({
					success: false,
					status: error.response.data.error,
				}),
			);

			return error.response.data;
		}
	},
);

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (user: UserLogged, { dispatch }) => {
		try {
			const response = await api.post(`/user/login`, {
				email: user.email,
				password: user.password,
			});

			dispatch(
				showNotification({
					success: true,
					status: response.data.status,
				}),
			);

			return response.data;
		} catch (error: any) {
			dispatch(
				showNotification({
					success: false,
					status: error.response.data.error,
				}),
			);

			return error.response.data;
		}
	},
);

const usersSlice = createSlice({
	initialState: usersAdapter.getInitialState({
		loading: false,
		status: '',
	}),
	name: 'users',
	extraReducers: (builder) => {
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.loading = false;
			state.status = action.payload.status;
		});
		builder.addCase(createUser.pending, (state) => {
			state.loading = true;
			state.status = 'Aguarde enquanto verificamos seu dados...';
		});
		builder.addCase(createUser.rejected, (state) => {
			state.loading = false;
			state.status = 'Algo deu errado. Chame o suporte!';
		});

		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;

			if (action.payload.success) {
				sessionStorage.setItem('auth', action.payload.body.id);
				return;
			}

			state.status = action.payload.status;
		});
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
			state.status = 'Aguarde enquanto verificamos seu dados...';
		});
		builder.addCase(loginUser.rejected, (state) => {
			state.loading = false;
			state.status = 'Algo deu errado. Chame o suporte!';
		});
	},
	reducers: {},
});

export default usersSlice.reducer;
