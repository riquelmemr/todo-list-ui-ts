import { Box, Button, Grid, Link, Typography } from '@mui/material';
import React from 'react';

import TextInput from '../../components/TextInput';
import { GridItem } from '../../components/Wrappers/GridItem';

import Logo from '/assets/logo.png';

const Login: React.FC = () => {
	return (
		<Box
			component={'main'}
			height={'100vh'}
			bgcolor={'black'}
			display={'flex'}
			alignItems={'center'}
		>
			<Box
				component={'form'}
				sx={{
					maxWidth: { xs: '80vw', sm: '60vw', md: '40vw' },
					margin: '0 auto',
					bgcolor: '#fff',
					borderRadius: '8px',
					boxShadow: '0px 0px 10px 1px #ffffff99',
				}}
			>
				<Grid container justifyContent={'center'} padding={3} gap={2}>
					<GridItem item xs={12}>
						<Box
							component={'img'}
							src={Logo}
							alt="logo"
							width={'100px'}
						/>
					</GridItem>
					<GridItem item xs={12} flexDirection={'column'}>
						<Typography
							variant={'h5'}
							component={'h1'}
							fontWeight={'500'}
						>
							To Do List Application
						</Typography>
						<Typography variant={'subtitle1'} component={'p'}>
							Realize o login e se organize da melhor maneira!
						</Typography>
					</GridItem>
					<GridItem item xs={12} mt={2}>
						<TextInput label="E-mail" type="email" />
					</GridItem>
					<Grid item xs={12}>
						<TextInput label="Password" type="password" />
					</Grid>
					<GridItem item xs={12}>
						<Typography>
							Não tem uma conta?{' '}
							<Link href="/register">Cadastre-se.</Link>
						</Typography>
					</GridItem>
					<Grid item xs={12} mt={2}>
						<Button
							type="submit"
							variant="contained"
							sx={{
								padding: '10px',
								':hover': {
									backgroundColor: '#222222',
								},
							}}
							fullWidth
						>
							Entrar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Login;
