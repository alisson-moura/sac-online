import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Migrations', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`/GET /migrations deve retornar 200`, async () => {
		const response = await request(app.getHttpServer()).get('/migrations');

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it(`/POST /migrations deve retornar 200`, async () => {
		const response = await request(app.getHttpServer()).post('/migrations');

		expect(response.status).toBe(201);
		expect(Array.isArray(response.body)).toBe(true);
	});

	afterAll(async () => {
		await app.close();
	});
});
