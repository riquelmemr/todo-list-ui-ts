import { Add } from '@mui/icons-material';
import { Fab, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
import Modal from '../../components/Modal';
import SearchComponent from '../../components/Search';
import TaskCard from '../../components/TaskCard';
import { GridItem } from '../../components/Wrappers/GridItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findAllTasks, findTasks } from '../../store/modules/tasks/tasksSlice';

const Archived = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const auth = sessionStorage.getItem('auth');

		dispatch(findTasks({}));

		if (!auth) {
			navigate('/');
		}
	}, []);

	const tasks = useAppSelector(findAllTasks);

	return (
		<MiniDrawer titlePage="Tarefas Arquivadas">
			<Grid container gap={2}>
				<GridItem item xs={12}>
					<SearchComponent />
				</GridItem>
				<Grid item xs={12}>
					<Grid container gap={2}>
						{tasks
							.filter((task) => task.archived)
							.map((task) => (
								<Grid key={task.id} item xs={12} sm={6} md={4}>
									<TaskCard task={task} />
								</Grid>
							))}
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
		</MiniDrawer>
	);
};

export default Archived;