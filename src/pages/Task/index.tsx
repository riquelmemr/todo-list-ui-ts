import { Button, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailsTask from '../../components/DetailsTask';
import MiniDrawer from '../../components/Drawer';
import { NotificationComponent } from '../../components/Notification';
import { GridItem } from '../../components/Wrappers/GridItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTask } from '../../store/modules/tasks/tasksSlice';

const Task = () => {
	const { id } = useParams();
	const { taskSelected } = useAppSelector((state) => state.tasks);
	const { loading } = useAppSelector((state) => state.tasks);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(getTask(id));
		}
	}, []);

	return (
		<MiniDrawer titlePage={taskSelected?.title}>
			<Grid container columnSpacing={4} rowSpacing={4}>
				<Grid item xs={12}>
					<Button
						variant="contained"
						sx={{
							bgcolor: '#202020',
							':hover': { bgcolor: '#303030' },
						}}
						onClick={() => window.history.back()}
					>
						Voltar
					</Button>
				</Grid>
				{loading && (
					<GridItem item xs={12}>
						<CircularProgress color="primary" size={25} />
					</GridItem>
				)}

				{!loading && taskSelected.title && (
					<DetailsTask task={taskSelected} />
				)}
			</Grid>

			<NotificationComponent />
		</MiniDrawer>
	);
};

export default Task;
