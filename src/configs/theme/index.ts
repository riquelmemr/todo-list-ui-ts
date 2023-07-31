import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#111',
			light: '#fff',
		},
		secondary: {
			main: '#111',
			light: '#fff',
			contrastText: '#eee',
		},
	},
	typography: {
		fontFamily: ['League Spartan', 'Sans-serif'].join(','),
	},
});
