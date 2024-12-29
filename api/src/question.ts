import { randomUUID } from 'node:crypto';
import { InvalidAnswerError } from './invalid-answer-error';

export enum QuestionTypes {
	NPS = 'nps',
	TEXT = 'text',
}
export class Question {
	private id: string;
	private title: string;
	private answerValue: number | string | null;
	private type: QuestionTypes;

	constructor({ title, type }: { title: string; type: QuestionTypes }) {
		this.id = randomUUID();
		this.title = title;
		this.type = type;
		this.answerValue = null;
	}

	public getTitle(): string {
		return this.title;
	}
	public getType(): string {
		return this.type;
	}

	public getId(): string {
		return this.id;
	}

	answer(value: number | string): void {
		switch (this.type) {
			case QuestionTypes.NPS:
				const intValue = parseInt(value as unknown as string);
				if (intValue < 0 || intValue > 10 || isNaN(intValue)) {
					throw new InvalidAnswerError('Apenas valores entre 0 e 10 são aceitos.');
				}
				this.answerValue = intValue;
				break;
			case QuestionTypes.TEXT:
				if (value.toString().length < 2) {
					throw new InvalidAnswerError('A resposta não pode ser vazia.');
				}
				this.answerValue = value;
				break;

			default:
				break;
		}
	}

	getAnswer(): number | string | null {
		return this.answerValue;
	}
}
