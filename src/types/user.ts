export interface User {
	name: string;
	email: string;
	password: string;
}

export type UserLogged = Omit<User, 'name'>;
