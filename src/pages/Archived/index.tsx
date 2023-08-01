import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
import Modal from '../../components/Modal';
import { NotificationComponent } from '../../components/Notification';
import SearchComponent from '../../components/Search';
import TaskCard from '../../components/TaskCard';
import { GridItem } from '../../components/Wrappers/GridItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findAllTasks, findTasks } from '../../store/modules/tasks/tasksSlice';

const Archived = () => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const tasks = useAppSelector(findAllTasks);

	useEffect(() => {
		const auth = sessionStorage.getItem('auth');

		if (!auth) {
			navigate('/');
		}

		dispatch(
			findTasks({
				archived: true,
			}),
		);
	}, []);

	useEffect(() => {
		dispatch(
			findTasks({
				archived: true,
				title: search,
			}),
		);
	}, [search]);

	return (
		<MiniDrawer titlePage="Tarefas Arquivadas">
			<Grid container gap={2}>
				<GridItem item xs={12}>
					<SearchComponent search={search} setSearch={setSearch} />
				</GridItem>
				<Grid item xs={12}>
					<Grid container gap={2}>
						{tasks.filter((t) => t.archived).length > 0 &&
							tasks.map((task) => (
								<Grid key={task.id} item xs={12} sm={6} md={4}>
									<TaskCard task={task} />
								</Grid>
							))}

						{tasks.filter((t) => t.archived).length === 0 && (
							<Grid item xs={12}>
								<Typography textAlign={'center'}>
									Nenhuma tarefa arquivada encontrada.
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>

			<Modal context={'create'} open={open} setOpen={setOpen} />
			<NotificationComponent />
		</MiniDrawer>
	);
};

export default Archived;
