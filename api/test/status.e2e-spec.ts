import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Status', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`/GET /status deve retornar 200`, async () => {
		const response = await request(app.getHttpServer()).get('/status');

		expect(response.status).toBe(200);
	});

	it(`/GET /status deve retornar a versão do banco de dados`, async () => {
		const response = await request(app.getHttpServer()).get('/status');
		expect(response.body.database.version).toBeGreaterThanOrEqual(16);
	});

	it(`/GET /status deve retornar o número de conexões disponivéis`, async () => {
		const response = await request(app.getHttpServer()).get('/status');
		expect(response.body.database.max_connections).toBeGreaterThan(1);
	});

	it(`/GET /status deve retornar o número de conexões abertas`, async () => {
		const response = await request(app.getHttpServer()).get('/status');
		expect(response.body.database.openned_connections).toBe(1);
	});

	afterAll(async () => {
		await app.close();
	});
});
