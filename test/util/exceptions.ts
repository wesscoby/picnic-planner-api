export class ExceptionNotThrownError extends Error {
	constructor() {
		super('Exception not thrown');
		this.name = 'ExceptionNotThrownError';
	}
}
