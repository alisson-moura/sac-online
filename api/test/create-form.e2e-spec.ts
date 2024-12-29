import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Forms Controllers', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`/POST Criar um formulário com uma questão de NPS`, () => {
		return request(app.getHttpServer())
			.post('/forms')
			.send({
				title: 'Formulário de exemplo',
				description: 'Descrição de exemplo',
				questions: [
					{
						title: 'Pode favor avalia de 0 a 10',
						type: 'nps',
					},
				],
			})
			.expect(201);
	});

	afterAll(async () => {
		await app.close();
	});
});
