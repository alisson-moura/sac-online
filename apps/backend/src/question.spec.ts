import { InvalidAnswerError } from './invalid-answer-error';
import { Question, QuestionTypes } from './question';

describe('Question', () => {
	describe('Questões NPS', () => {
		test('deve ser possível criar uma questão', () => {
			const question = new Question({
				title: 'Título de exemplo',
				type: QuestionTypes.NPS,
			});

			expect(question.getTitle()).toEqual('Título de exemplo');
			expect(question.getType()).toEqual('nps');
		});
		describe('Responder questão do tipo NPS', () => {
			let question: Question;
			beforeEach(() => {
				question = new Question({
					title: 'Título de exemplo',
					type: QuestionTypes.NPS,
				});
			});

			test('Deve ser possível responder com um numero de 0 à 10', () => {
				question.answer(10);
				expect(question.getAnswer()).toEqual(10);
			});
			test('não deve ser possível responder com um numero negativo', () => {
				expect(() => question.answer(-1)).toThrow(InvalidAnswerError);
			});
			test('não deve ser possível responder com um numero maior que 10', () => {
				expect(() => question.answer(11)).toThrow(InvalidAnswerError);
			});
			test('não deve ser possível responder com um valor não numérico', () => {
				expect(() => question.answer('abc' as unknown as number)).toThrow(InvalidAnswerError);
			});
		});
	});

	describe('Questões de Texto', () => {
		test('deve ser possível criar uma questão de texto', () => {
			const question = new Question({
				title: 'Título de exemplo',
				type: QuestionTypes.TEXT,
			});

			expect(question.getTitle()).toEqual('Título de exemplo');
			expect(question.getType()).toEqual('text');
		});
		describe('Responder questão do tipo Texto', () => {
			let question: Question;
			beforeEach(() => {
				question = new Question({
					title: 'Título de exemplo',
					type: QuestionTypes.TEXT,
				});
			});
			test('Deve ser possível responder com um texto curto', () => {
				question.answer('exemplo de feedback');
				expect(question.getAnswer()).toEqual('exemplo de feedback');
			});
			test('não deve ser possível responder com uma string vazia', () => {
				expect(() => question.answer('')).toThrow(InvalidAnswerError);
			});
		});
	});
});
