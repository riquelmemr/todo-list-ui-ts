import { Add } from '@mui/icons-material';
import { CircularProgress, Fab, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
import Filter from '../../components/FilterStatus';
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
	const [filter, setFilter] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { loading } = useAppSelector((state) => state.tasks);
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
				archived: filter === 'Arquivadas',
				done: filter === 'Finalizadas' ? true : undefined,
				title: search,
			}),
		);
	}, [search]);

	useEffect(() => {
		if (filter === 'Arquivadas') {
			dispatch(
				findTasks({
					archived: true,
				}),
			);
		}

		if (filter === 'Finalizadas') {
			dispatch(
				findTasks({
					done: true,
				}),
			);
		}

		if (filter === '') {
			dispatch(
				findTasks({
					archived: false,
				}),
			);
		}
	}, [filter]);

	return (
		<MiniDrawer titlePage="Página Inicial">
			<Grid container gap={2}>
				<GridItem item xs={12}>
					<Grid container gap={2}>
						<GridItem item xs={12}>
							<SearchComponent
								search={search}
								setSearch={setSearch}
							/>
						</GridItem>
						<GridItem item xs={12}>
							<Filter value={filter} setValue={setFilter} />
						</GridItem>
					</Grid>
				</GridItem>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						{tasks.length > 0 &&
							tasks.map((task) => (
								<Grid key={task.id} item xs={12} sm={6} md={4}>
									<TaskCard task={task} />
								</Grid>
							))}

						{loading && (
							<GridItem item xs={12}>
								<CircularProgress color="primary" size={25} />
							</GridItem>
						)}

						{!loading && tasks.length === 0 && (
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
