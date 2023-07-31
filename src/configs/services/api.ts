import axios from 'axios';

export const api = axios.create({
	// baseURL: 'https://todo-list-backend-demo.onrender.com/',
	baseURL: 'http://localhost:5001/',
});
