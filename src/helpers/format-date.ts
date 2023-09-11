export function formatDate(date: string) {
	return date.slice(0, 10).replace(/-/g, '/').split('/').reverse().join('/');
}
