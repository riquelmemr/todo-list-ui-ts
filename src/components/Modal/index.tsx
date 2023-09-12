import { ThemeProvider } from '@emotion/react';
import { Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useState } from 'react';

import { theme } from '../../configs/theme';
import { useAppDispatch } from '../../store/hooks';
import {
	createTask,
	deleteTask,
	updateTask,
} from '../../store/modules/tasks/tasksSlice';
import { Task } from '../../types/task';
import SnackBarMessage from '../SnackBar';

interface ModalProps {
	task?: Task;
	context: 'create' | 'update' | 'delete' | 'restore' | 'archive';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ task, context, open, setOpen }) => {
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState(task?.title || '');
	const [description, setDescription] = useState(task?.description || '');
	const [finishedDate, setFinishedDate] = useState(
		task?.finishedDate?.slice(0, 10) || '',
	);

	const dispatch = useAppDispatch();

	const handleSubmit = () => {
		switch (context) {
			case 'create':
				if (!title || !description) {
					setOpenSnackBar(true);
					setMessage('Preencha todos os campos');
					return;
				}

				dispatch(
					createTask({
						title,
						description,
						finishedDate,
					}),
				);
				break;

			case 'update':
				if (!title || !description) {
					setOpenSnackBar(true);
					setMessage('Preencha todos os campos');
					return;
				}

				if (task) {
					dispatch(
						updateTask({
							id: task.id,
							title: title,
							description: description,
							finishedDate: finishedDate,
						}),
					);
				}

				break;

			case 'delete':
				if (task) {
					dispatch(deleteTask(task.id));
				}

				break;

			case 'restore':
				if (task) {
					dispatch(
						updateTask({ id: task.id, archived: !task.archived }),
					);
				}

				break;
		}

		setOpen(false);
		setTitle('');
		setDescription('');
		setFinishedDate('');
	};

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{
					'& .MuiPaper-root': {
						borderRadius: '8px',
						backgroundColor: '#1b1b1b',
					},
				}}
			>
				<DialogTitle id="alert-dialog-title" color={'#fff'}>
					{context === 'create'
						? 'Crie sua tarefa'
						: context === 'update'
						? 'Edite sua tarefa'
						: context === 'delete'
						? 'Deseja excluir essa tarefa?'
						: context === 'restore'
						? 'Deseja restaurar essa tarefa?'
						: 'Deseja arquivar essa tarefa?'}
				</DialogTitle>

				{context !== 'delete' && context !== 'restore' && (
					<DialogContent>
						<SnackBarMessage
							mode="error"
							open={openSnackBar}
							handleClose={() => setOpenSnackBar(false)}
							message={message}
						/>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Box
									component={'label'}
									sx={{
										fontSize: '16px',
										fontWeight: '500',
										color: theme.palette.primary.light,
									}}
								>
									Título
								</Box>
								<TextField
									fullWidth
									variant="standard"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									InputProps={{
										disableUnderline: true,
										style: {
											color: '#ffffff',
											fontSize: '16px',
										},
									}}
									sx={{
										padding: '12px',
										borderRadius: '6px',
										backgroundColor: '#43474a',
										border: 'none',
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<Box
									component={'label'}
									sx={{
										fontSize: '16px',
										fontWeight: '500',
										color: theme.palette.primary.light,
									}}
								>
									Descrição
								</Box>
								<TextField
									fullWidth
									id="filled-multiline-flexible"
									variant="standard"
									multiline
									maxRows={20}
									value={description}
									onChange={(
										e: React.ChangeEvent<HTMLTextAreaElement>,
									) => setDescription(e.target.value)}
									InputProps={{
										disableUnderline: true,
										style: {
											color: '#fff',
											fontSize: '16px',
										},
									}}
									sx={{
										padding: '12px',
										border: 'none',
										borderRadius: '6px',
										backgroundColor: '#43474a',
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<Box
									component={'label'}
									sx={{
										fontSize: '16px',
										fontWeight: '500',
										color: theme.palette.primary.light,
									}}
								>
									Data de Conclusão
								</Box>
								<TextField
									fullWidth
									type="date"
									id="filled-multiline-flexible"
									variant="standard"
									value={finishedDate}
									onChange={(e) =>
										setFinishedDate(e.target.value)
									}
									InputProps={{
										sx: {
											color: '#fff',
										},
									}}
									sx={{
										padding: '12px',
										border: 'none',
										borderRadius: '6px',
										backgroundColor: '#43474a',
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
				)}
				<DialogActions>
					<Button
						variant="contained"
						onClick={() => setOpen(false)}
						sx={{
							bgcolor: '#c93f3f',
							'&:hover': { bgcolor: '#921212' },
						}}
					>
						{context === 'create' || context === 'update'
							? 'Cancelar'
							: 'Não'}
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							handleSubmit();
						}}
						sx={{
							bgcolor: '#228654',
							'&:hover': { bgcolor: '#1b5c3b' },
						}}
					>
						{context === 'create'
							? 'Criar'
							: context === 'update'
							? 'Editar'
							: 'Sim'}
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	);
};

export default Modal;
