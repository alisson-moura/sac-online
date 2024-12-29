import { randomUUID } from 'node:crypto';
import { Question } from './question';

export class Form {
	private id: string;
	private title: string;
	private description: string;
	private questions: Question[];

	constructor({ title, description }: { title: string; description: string }) {
		this.title = title;
		this.description = description;
		this.questions = [];
		this.id = randomUUID();
	}

	public getTitle(): string {
		return this.title;
	}

	public getDescription(): string {
		return this.description;
	}

	public add(question: Question): void {
		this.questions.push(question);
	}

	public get(id: string) {
		return this.questions.find((question) => question.getId() === id);
	}
}
