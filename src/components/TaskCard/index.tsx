import { ThemeProvider } from '@emotion/react';
import {
	Archive,
	ArchiveOutlined,
	CheckCircle,
	CheckCircleOutline,
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { theme } from '../../configs/theme';
import { useAppDispatch } from '../../store/hooks';
import { updateTask } from '../../store/modules/tasks/tasksSlice';
import { Task } from '../../types/task';
import Modal from '../Modal';

interface TaskCardProps {
	task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const [open, setOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

	const dispatch = useAppDispatch();

	const handleArchived = () => {
		dispatch(
			updateTask({
				id: task.id,
				archived: !task.archived,
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

	return (
		<ThemeProvider theme={theme}>
			<Card
				sx={{
					width: '100%',
					backgroundColor: task.archived ? '#272727' : '#333333',
					color: theme.palette.secondary.contrastText,
					borderRadius: '8px',
				}}
			>
				<CardContent>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography gutterBottom variant="h6" component="h3">
							{task.title}
						</Typography>
					</Box>

					<Typography variant="body2" color={'#bbb'}>
						{task.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '16px',
					}}
				>
					{task.archived && (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								size="small"
								variant="contained"
								sx={{
									bgcolor: '#c93f3f',
									'&:hover': { bgcolor: '#921212' },
								}}
								onClick={() => {
									setOpen(true);
									setIsDelete(true);
									setIsUpdate(false);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					{!task.done && !task.archived && (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								size="small"
								variant="contained"
								onClick={() => {
									setIsUpdate(true);
									setIsDelete(false);
									setOpen(true);
								}}
							>
								Editar
							</Button>
							<Button
								size="small"
								variant="contained"
								sx={{
									bgcolor: '#c93f3f',
									'&:hover': { bgcolor: '#921212' },
								}}
								onClick={() => {
									setOpen(true);
									setIsDelete(true);
									setIsUpdate(false);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					{task.done && !task.archived && (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								size="small"
								variant="contained"
								sx={{
									bgcolor: '#c93f3f',
									'&:hover': { bgcolor: '#921212' },
								}}
								onClick={() => {
									setOpen(true);
									setIsDelete(true);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					<Typography variant="body2" component="div">
						{task.createdAt}
					</Typography>
					<Box component={'div'}>
						{task.archived ? (
							<IconButton
								sx={{ color: '#fff' }}
								onClick={() => {
									handleArchived();
								}}
							>
								<Archive />
							</IconButton>
						) : (
							<IconButton
								sx={{ color: '#fff' }}
								onClick={() => handleArchived()}
							>
								<ArchiveOutlined />
							</IconButton>
						)}
						{!task.archived && (
							<IconButton
								sx={{ color: '#fff' }}
								onClick={() => {
									handleDone();
								}}
							>
								{task.done ? (
									<CheckCircle />
								) : (
									<CheckCircleOutline />
								)}
							</IconButton>
						)}
					</Box>
				</CardActions>
			</Card>

			<Modal
				task={task}
				context={isDelete ? 'delete' : isUpdate ? 'update' : 'restore'}
				open={open}
				setOpen={setOpen}
			/>
		</ThemeProvider>
	);
};

export default TaskCard;
