export interface User {
	id: string;
	name: string;
	email: string;
	isLogged: boolean;
}

export type UserLogged = Omit<User, 'isLogged' | 'id'>;
