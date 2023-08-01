import { Validation } from '../types/validation';
import { regexEmail } from './regex';

export function validationLogin(email: string, password: string): Validation {
	if (!email || !password) {
		return {
			success: false,
			message: 'Preencha todos os campos!',
		};
	}

	if (!regexEmail.test(email)) {
		return {
			success: false,
			message: 'E-mail ou senha inválidos.',
		};
	}

	if (password.length < 6) {
		return {
			success: false,
			message: 'E-mail ou senha inválidos.',
		};
	}

	return {
		success: true,
		message: '',
	};
}

export function validationCreateAccount(
	name: string,
	email: string,
	password: string,
): Validation {
	if (!name || !email || !password) {
		return {
			success: false,
			message: 'Preencha todos os campos!',
		};
	}

	if (!regexEmail.test(email)) {
		return {
			success: false,
			message: 'Digite um e-mail válido.',
		};
	}

	if (password.length < 6) {
		return {
			success: false,
			message: 'Sua senha deve ter no mínimo 6 caracteres.',
		};
	}

	return {
		success: true,
		message: '',
	};
}
