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
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();

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
				onClick={() => navigate(`/task/${task.id}`)}
				sx={{
					position: 'relative',
					width: '100%',

					backgroundColor: task.archived ? '#5e5e5e' : '#292929',
					color: theme.palette.secondary.contrastText,
					borderRadius: '6px',
					boxShadow: '5px 5px 10px rgba(26, 26, 26, 0.25)',
					transition: '0.5s',
					filter: task.done ? 'brightness(50%)' : 'brightness(100%)',
					zIndex: 1,

					':hover': {
						cursor: 'pointer',
						boxShadow: '5px 5px 20px rgba(26, 26, 26, 5)',
						filter: 'brightness(100%)',
					},
				}}
			>
				<CardContent>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography
							gutterBottom
							variant="h6"
							component="h3"
							sx={{
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{task.title}
						</Typography>
					</Box>

					<Typography
						variant="body2"
						component={'h3'}
						color={'#bbb'}
						sx={{
							display: 'block',
							textDecoration: task.done ? 'line-through' : 'none',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{task.description}
					</Typography>
					<Typography
						variant="body2"
						color={'#bbb'}
						fontSize={'12px'}
						mt={1}
						sx={{
							display: {
								xs: 'block',
								lg: 'none',
							},
						}}
					>
						{task.createdAt
							.slice(0, 10)
							.replace(/-/g, '/')
							.split('/')
							.reverse()
							.join('/')}
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
									zIndex: 2,
								}}
								onClick={(e) => {
									e.stopPropagation();
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
								sx={{
									bgcolor: '#228654',
									'&:hover': { bgcolor: '#1b5c3b' },
									zIndex: 2,
								}}
								onClick={(e) => {
									e.stopPropagation();
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
									zIndex: 2,
								}}
								onClick={(e) => {
									e.stopPropagation();
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
									zIndex: 2,
								}}
								onClick={(e) => {
									e.stopPropagation();
									setOpen(true);
									setIsDelete(true);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					<Typography
						variant="subtitle1"
						component="div"
						fontSize={'12px'}
						sx={{
							display: {
								xs: 'none',
								lg: 'block',
							},
						}}
					>
						{task.createdAt
							.slice(0, 10)
							.replace(/-/g, '/')
							.split('/')
							.reverse()
							.join('/')}
					</Typography>
					<Box component={'div'} sx={{ display: 'flex' }}>
						{task.archived ? (
							<IconButton
								sx={{ color: '#fff' }}
								onClick={(e) => {
									e.stopPropagation();
									handleArchived();
								}}
							>
								<Archive />
							</IconButton>
						) : (
							<IconButton
								sx={{ color: '#fff' }}
								onClick={(e) => {
									e.stopPropagation();
									handleArchived();
								}}
							>
								<ArchiveOutlined />
							</IconButton>
						)}
						{!task.archived && (
							<IconButton
								sx={{ color: '#fff' }}
								onClick={(e) => {
									e.stopPropagation();
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
