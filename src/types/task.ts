export interface Task {
	id: string;
	title: string;
	description: string;
	done: boolean;
	archived: boolean;
	createdAt: string;
	finishedDate?: string;
}

export type CreateTask = Omit<Task, 'id' | 'done' | 'archived' | 'createdAt'>;

export type UpdateTask = Partial<Omit<Task, 'id' | 'createdAt'>> & {
	id: string;
};

export type FiltersTask = Partial<Omit<Task, 'id' | 'createdAt'>>;
