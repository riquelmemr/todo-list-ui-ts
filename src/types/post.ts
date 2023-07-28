export interface Post {
	id: string;
	title: string;
	body: string;
}

export type SetPost = Omit<Post, 'id'>;
