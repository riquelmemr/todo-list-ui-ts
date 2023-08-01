/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '../..';
import { api } from '../../../configs/services/api';
import { CreateTask, FiltersTask, Task, UpdateTask } from '../../../types/task';
import { showNotification } from '../notifications/notificationsSlice';

const tasksAdapter = createEntityAdapter<Task>({
	selectId: (state) => state.id,
});

export const createTask = createAsyncThunk(
	'tasks/createTask',
	async (task: CreateTask, { dispatch }) => {
		try {
			const userId = sessionStorage.getItem('auth');

			const response = await api.post(`/task/${userId}/create`, {
				title: task.title,
				description: task.description,
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

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (id: string, { dispatch }) => {
		try {
			const userId = sessionStorage.getItem('auth');

			const response = await api.delete(`/task/${userId}/delete/${id}`);

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

export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async (task: UpdateTask, { dispatch }) => {
		try {
			const userId = sessionStorage.getItem('auth');

			const response = await api.put(
				`/task/${userId}/update/${task.id}`,
				task,
			);

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

export const findTasks = createAsyncThunk(
	'tasks/findTasks',
	async (filters: FiltersTask, { dispatch }) => {
		try {
			const userId = sessionStorage.getItem('auth');

			const response = await api.get(`/task/${userId}`, {
				params: filters,
			});

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

const tasksSlice = createSlice({
	initialState: tasksAdapter.getInitialState({
		loading: false,
		status: '',
	}),
	name: 'tasks',
	extraReducers: (builder) => {
		// Criação da tarefa
		builder.addCase(createTask.fulfilled, (state, action) => {
			state.loading = false;
			state.status = action.payload.status;

			if (action.payload.success) {
				tasksAdapter.addOne(state, action.payload.body);
			}
		});
		builder.addCase(createTask.pending, (state) => {
			state.loading = true;
			state.status = 'Aguarde enquanto verificamos seu dados...';
		});
		builder.addCase(createTask.rejected, (state) => {
			state.loading = false;
			state.status = 'Algo deu errado. Chame o suporte!';
		});

		// Exclusão da tarefa
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			state.loading = false;

			if (action.payload.success) {
				tasksAdapter.removeOne(state, action.payload.body.id);
			}

			state.status = action.payload.status;
		});
		builder.addCase(deleteTask.pending, (state) => {
			state.loading = true;
			state.status = 'Aguarde enquanto verificamos seu dados...';
		});
		builder.addCase(deleteTask.rejected, (state) => {
			state.loading = false;
			state.status = 'Algo deu errado. Chame o suporte!';
		});

		// Busca das tarefas
		builder.addCase(findTasks.pending, (state) => {
			state.loading = false;
			state.status = 'Aguarde enquanto verificamos seu dados...';
		});
		builder.addCase(findTasks.fulfilled, (state, action) => {
			state.loading = false;
			state.status = action.payload.status;

			if (action.payload.success) {
				tasksAdapter.setAll(state, action.payload.body);
			}
		});
		builder.addCase(findTasks.rejected, (state) => {
			state.loading = false;
			state.status = 'Algo deu errado. Chame o suporte!';
		});

		// Atualização da tarefa
		builder.addCase(updateTask.pending, (state) => {
			state.loading = true;
			state.status = 'Aguarde enquanto verificamos seu dados...';
		});
		builder.addCase(updateTask.rejected, (state) => {
			state.loading = false;
			state.status = 'Algo deu errado. Chame o suporte!';
		});

		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.loading = false;
			state.status = action.payload.status;

			if (action.payload.success) {
				tasksAdapter.updateOne(state, {
					id: action.payload.body.id,
					changes: action.payload.body,
				});
			}
		});
	},
	reducers: {},
});

export const { selectAll: findAllTasks } = tasksAdapter.getSelectors(
	(state: RootState) => state.tasks,
);

export default tasksSlice.reducer;
