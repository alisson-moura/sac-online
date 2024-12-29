import { Injectable } from '@nestjs/common';
import { Form } from './form';
import { Question, QuestionTypes } from './question';

export interface CreateFormInput {
	title: string;
	description: string;
	questions: Array<{
		title: string;
		type: QuestionTypes;
	}>;
}

@Injectable()
export class CreateFormService {
	async execute(input: CreateFormInput): Promise<void> {
		const form = new Form({
			title: input.title,
			description: input.description,
		});
		input.questions.forEach((question) => {
			form.add(new Question({ title: question.title, type: question.type }));
		});
	}
}
