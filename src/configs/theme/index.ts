import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#000',
			dark: '#000',
		},
		secondary: {
			main: '#000',
			light: '#fff',
			contrastText: '#eee',
		},
	},
	typography: {
		fontFamily: ['League Spartan', 'Open Sans'].join(','),
	},
});
