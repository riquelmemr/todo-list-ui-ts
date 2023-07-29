import { Box, Typography } from '@mui/material';
import React from 'react';

interface FormHeaderLoginProps {
	context: 'login' | 'register';
}

const FormHeaderLogin: React.FC<FormHeaderLoginProps> = ({ context }) => {
	return (
		<Box display={'flex'} flexDirection={'column'}>
			<Typography
				variant={'h5'}
				component={'h2'}
				fontWeight={'500'}
				textAlign={'center'}
				sx={{
					display: { xs: 'none', md: 'block' },
				}}
			>
				{context === 'login' ? 'Realize seu login!' : 'Crie sua conta!'}
			</Typography>
			<Typography
				variant={'h5'}
				component={'h2'}
				fontWeight={'500'}
				textAlign={'center'}
				sx={{
					display: { xs: 'block', md: 'none' },
				}}
			>
				Task Hub Application
			</Typography>
			<Typography
				variant={'subtitle1'}
				component={'p'}
				textAlign={'center'}
				sx={{ color: '#727272' }}
			>
				{context === 'login'
					? 'Entre com suas credenciais, e continue sua experiência personalizada!'
					: 'Comece a sua jornada e explore novas possibilidades!'}
			</Typography>
		</Box>
	);
};

export default FormHeaderLogin;
