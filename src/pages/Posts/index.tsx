import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPost } from '../../store/modules/posts/postsSlice';
import { SetPost } from '../../types/post';

const Welcome: React.FC = () => {
	const dispatch = useAppDispatch();
	const userLogged = useAppSelector((state) => state.userLogged);
	const posts = useAppSelector((state) => state.posts);

	const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(e.currentTarget.postTitle.value);
		console.log(e.currentTarget.postBody.value);

		const post: SetPost = {
			title: e.currentTarget.postTitle.value,
			body: e.currentTarget.postBody.value,
		};

		dispatch(setPost(post));
	};

	return (
		<div className="App">
			<h1>
				{userLogged.name ? `Welcome ${userLogged.name}` : 'Welcome!'}
			</h1>
			<div>
				<h2>Crie seu post de teste:</h2>
				<form onSubmit={handleSubmitPost}>
					<input type="text" name="postTitle" id="postTitle" />
					<input type="text" name="postBody" id="postBody" />
					<button type="submit" name="submit">
						Criar
					</button>
				</form>
			</div>
			<div>
				<h3>Post:</h3>
				<h4>{posts.title}</h4>
				<p>{posts.body}</p>
			</div>
		</div>
	);
};

export default Welcome;
