import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { theme } from './configs/theme';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
);
