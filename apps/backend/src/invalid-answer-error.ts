export class InvalidAnswerError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = 'InvalidAnswerError';
	}
}
