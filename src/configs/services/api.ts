import axios from 'axios';

export const api = axios.create({
	baseURL:
		import.meta.env.VITE_APP_ENV === 'PRODUCTION'
			? import.meta.env.VITE_URL_API
			: 'http://localhost:5001',
});
