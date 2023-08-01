import { Add } from '@mui/icons-material';
import { Fab, Grid, Typography } from '@mui/material';
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

const Home = () => {
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
				archived: false,
			}),
		);
	}, []);

	useEffect(() => {
		dispatch(
			findTasks({
				archived: false,
				title: search,
			}),
		);
	}, [search]);

	return (
		<MiniDrawer titlePage="Página Inicial">
			<Grid container gap={2}>
				<GridItem item xs={12}>
					<SearchComponent search={search} setSearch={setSearch} />
				</GridItem>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						{tasks.filter((t) => !t.archived).length > 0 &&
							tasks
								.filter((t) => !t.archived)
								.map((task) => (
									<Grid
										key={task.id}
										item
										xs={12}
										sm={6}
										md={4}
									>
										<TaskCard task={task} />
									</Grid>
								))}

						{tasks.filter((t) => !t.archived).length === 0 && (
							<Grid item xs={12}>
								<Typography textAlign={'center'}>
									Nenhuma tarefa encontrada ou cadastrada.
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
			>
				<Add onClick={() => setOpen(true)} />
			</Fab>
			<Modal context={'create'} open={open} setOpen={setOpen} />
			<NotificationComponent />
		</MiniDrawer>
	);
};

export default Home;
