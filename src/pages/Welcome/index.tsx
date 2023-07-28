import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserLogged } from '../../store/modules/userLogged/userLoggedSlice';
import { UserLogged } from '../../types/user';

const Welcome: React.FC = () => {
	const dispatch = useAppDispatch();
	const userLogged = useAppSelector((state) => state.userLogged);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Logic to validate

		console.log(e.currentTarget.username.value);
		console.log(e.currentTarget.email.value);

		const user: UserLogged = {
			name: e.currentTarget.username.value,
			email: e.currentTarget.email.value,
		};

		dispatch(setUserLogged(user));
		navigate('/posts');
	};

	return (
		<div className="App">
			<h1>
				{userLogged.name ? `Welcome ${userLogged.name}` : 'Welcome!'}
			</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<input type="text" name="username" id="username" />
					<input type="email" name="email" id="email" />
					<button type="submit" name="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Welcome;
