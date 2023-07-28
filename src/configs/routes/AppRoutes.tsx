import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Posts from '../../pages/Posts';
import Welcome from '../../pages/Welcome';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/posts" element={<Posts />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
