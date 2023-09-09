import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateTask } from '../../store/modules/tasks/tasksSlice';
import { Task } from '../../types/task';
import Modal from '../Modal';
import { NotificationComponent } from '../Notification';
import { GridItem } from '../Wrappers/GridItem';

interface DetailsTaskProps {
	task: Task;
}

const DetailsTask: React.FC<DetailsTaskProps> = ({ task }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [finishedDate, setFinishedDate] = useState(
		task.finishedDate?.slice(0, 10),
	);
	const [open, setOpen] = useState(false);

	const { loading } = useAppSelector((state) => state.tasks);
	const dispatch = useAppDispatch();

	const handleSave = () => {
		if (!title || !description) {
			return;
		}

		if (title === task.title && description === task.description) {
			return;
		}

		dispatch(
			updateTask({
				id: task.id,
				title,
				description,
				finishedDate,
			}),
		);
	};

	const handleDone = () => {
		dispatch(
			updateTask({
				id: task.id,
				done: !task.done,
			}),
		);
	};

	const handleArchived = () => {
		dispatch(
			updateTask({
				id: task.id,
				archived: !task.archived,
			}),
		);
	};

	return (
		<>
			<Grid
				item
				xs={12}
				sm={8}
				display={'flex'}
				flexDirection={'column'}
				position={'relative'}
			>
				<TextField
					variant="standard"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					InputProps={{
						disableUnderline: true,
						sx: {
							fontSize: { xs: '24px', sm: '33px' },
							fontWeight: '500',
						},
					}}
				/>
				<Divider />
				<TextField
					variant="standard"
					type="text"
					multiline
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					sx={{
						marginTop: '16px',
					}}
					InputProps={{
						disableUnderline: true,
						sx: {
							fontSize: '16px',
						},
					}}
				/>
				<Button
					variant="contained"
					sx={{
						width: { xs: '100%', sm: '60%' },
						position: { xs: 'sticky', sm: 'fixed' },
						bottom: '16px',
						padding: '16px',
						marginTop: { xs: '16px', sm: '0px' },

						bgcolor: '#202020',
						':hover': { bgcolor: '#303030' },
					}}
					onClick={handleSave}
				>
					Salvar alterações
				</Button>
			</Grid>

			<Grid item xs={12} sm={4}>
				<Box
					sx={{
						borderRadius: '8px',
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						rowGap: '20px',
						columnGap: '20px',
					}}
				>
					<Box>
						<Typography variant="subtitle1" fontWeight={'600'}>
							Data de Criação
						</Typography>
						<Typography>
							{task.createdAt &&
								task.createdAt
									.slice(0, 10)
									.replace(/-/g, '/')
									.split('/')
									.reverse()
									.join('/')}
						</Typography>
					</Box>

					<Box>
						<Typography variant="subtitle1" fontWeight={'600'}>
							Status
						</Typography>
						<Typography
							variant="subtitle1"
							sx={{
								color: task?.done ? '#228654' : '#c93f3f',
							}}
						>
							{task?.done
								? 'Concluído'
								: task?.archived
								? 'Arquivado'
								: 'Pendente'}
						</Typography>
					</Box>

					<Box>
						<Typography variant="subtitle1" fontWeight={'600'}>
							Data de Conclusão
						</Typography>
						<TextField
							type="date"
							variant="standard"
							value={finishedDate}
							onChange={(e) => setFinishedDate(e.target.value)}
						/>
					</Box>
				</Box>

				{!task.done && (
					<Button
						variant="contained"
						fullWidth
						sx={{
							marginTop: '18px',
							bgcolor: '#228654',
							'&:hover': { bgcolor: '#0c6e2e' },
						}}
						onClick={handleDone}
					>
						Concluir tarefa
					</Button>
				)}

				{task.archived && (
					<Button
						variant="contained"
						fullWidth
						sx={{
							bgcolor: '#3b3b3b',
							'&:hover': { bgcolor: '#292929' },
							marginTop: task.done ? '18px' : '10px',
						}}
						onClick={handleArchived}
					>
						Desarquivar a tarefa
					</Button>
				)}

				{!task.archived && (
					<Button
						variant="contained"
						fullWidth
						sx={{
							marginTop: task.done ? '18px' : '10px',
							bgcolor: '#3b3b3b',
							'&:hover': { bgcolor: '#292929' },
						}}
						onClick={handleArchived}
					>
						Arquivar tarefa
					</Button>
				)}

				<Button
					variant="contained"
					fullWidth
					sx={{
						marginTop: '10px',
						bgcolor: '#c93f3f',
						'&:hover': { bgcolor: '#921212' },
					}}
					onClick={() => {
						setOpen(true);
					}}
				>
					Excluir tarefa
				</Button>
			</Grid>

			{loading && (
				<GridItem item xs={12}>
					<CircularProgress color="primary" size={25} />
				</GridItem>
			)}

			<Modal
				context={'delete'}
				open={open}
				setOpen={setOpen}
				task={task}
				linkAfterAction="/home"
			/>
			<NotificationComponent />
		</>
	);
};

export default DetailsTask;
