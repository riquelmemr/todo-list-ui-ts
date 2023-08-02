import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Link,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormHeaderLogin from '../../components/FormHeaderLogin';
import LogoComponent from '../../components/Logo';
import { NotificationComponent } from '../../components/Notification';
import TextInput from '../../components/TextInput';
import { GridItem } from '../../components/Wrappers/GridItem';
import { validationLogin } from '../../helpers/validation-login';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showNotification } from '../../store/modules/notifications/notificationsSlice';
import { loginUser } from '../../store/modules/users/usersSlice';
import { UserLogged } from '../../types/user';

import Logo from '/assets/logo.png';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { status, loading } = useAppSelector((state) => state.users);

	const handleSubmit = (ev: React.FormEvent) => {
		ev.preventDefault();

		const { success, message } = validationLogin(email, password);

		if (!success) {
			dispatch(
				showNotification({
					success,
					status: message,
				}),
			);

			return;
		}

		const user: UserLogged = {
			email,
			password,
		};

		dispatch(loginUser(user));
	};

	useEffect(() => {
		const auth = sessionStorage.getItem('auth');

		if (auth && status === 'Usuário logado com sucesso!') {
			navigate('/home');
		}
	}, [navigate, status]);

	return (
		<>
			<Grid
				container
				component={'main'}
				height={'100vh'}
				bgcolor={'black'}
				display={'flex'}
			>
				<Box
					component={'img'}
					src={Logo}
					width={'60px'}
					sx={{
						display: { xs: 'block', md: 'none' },
						position: 'absolute',
						top: '10px',
						left: '10px',
					}}
				/>
				<LogoComponent />
				<GridItem item xs={12} md={6}>
					<Box
						component={'form'}
						onSubmit={(ev: React.FormEvent) => handleSubmit(ev)}
						sx={{
							maxWidth: { xs: '80vw', sm: '60vw', md: '35vw' },
							margin: '0 auto',
							bgcolor: '#fff',
							borderRadius: '8px',
						}}
					>
						<Grid
							container
							justifyContent={'center'}
							padding={3}
							gap={2}
						>
							<GridItem item xs={12}>
								<FormHeaderLogin context="login" />
							</GridItem>
							<GridItem item xs={12} mt={2}>
								<TextInput
									label="Digite seu e-mail"
									type="email"
									value={email}
									setValue={setEmail}
								/>
							</GridItem>
							<Grid item xs={12}>
								<TextInput
									label="Digite sua senha"
									type="password"
									value={password}
									setValue={setPassword}
								/>
							</Grid>
							<GridItem item xs={12}>
								<Typography>
									Não tem uma conta?{' '}
									<Link
										href="/register"
										sx={{ color: '#5909b6' }}
									>
										Cadastre-se.
									</Link>
								</Typography>
							</GridItem>
							<Grid item xs={12} mt={2}>
								<Button
									type="submit"
									variant="contained"
									sx={{
										color: '#fff',
										padding: '10px',
										':hover': {
											backgroundColor: '#222222',
										},
									}}
									fullWidth
								>
									{loading && (
										<CircularProgress
											color="inherit"
											size={25}
										/>
									)}
									{!loading && 'Entrar'}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</GridItem>
			</Grid>

			<NotificationComponent />
		</>
	);
};

export default Login;
