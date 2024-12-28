import { Form } from './form';
import { Question, QuestionTypes } from './question';

describe('Formulário', () => {
	describe('Criar um formulário', () => {
		test('Deve criar um formulário com título e descrição', () => {
			const titleForm = 'Título de exemplo';
			const descriptionForm = 'Descrição de exemplo';

			const form = new Form({
				title: titleForm,
				description: descriptionForm,
			});

			expect(form.getTitle()).toEqual(titleForm);
			expect(form.getDescription()).toEqual(descriptionForm);
		});
	});

	describe('Adicionar questões a um formulário', () => {
		let form: Form;
		beforeEach(() => {
			form = new Form({
				title: 'Título de exemplo',
				description: 'Descrição de exemplo',
			});
		});
		test('Deve ser possíver adicionar uma questão no formulário', () => {
			const question = new Question({
				title: 'Título de exemplo',
				type: QuestionTypes.NPS,
			});

			form.add(question);

			expect(form.get(question.getId())).toEqual(question);
		});
	});
});
