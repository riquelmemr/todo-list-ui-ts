import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Archived from '../../pages/Archived';
import Done from '../../pages/Done';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Task from '../../pages/Task';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/archiveds" element={<Archived />} />
				<Route path="/home" element={<Home />} />
				<Route path="/dones" element={<Done />} />
				<Route path="/task/:id" element={<Task />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
