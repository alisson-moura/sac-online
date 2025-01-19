import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env.test' });

import { Database } from '../../src/infra/database';
import { MigrationsController } from '../../src/infra/migrations.controller';

beforeEach(async () => {
	const database = new Database();
	await database.query({
		text: 'DROP SCHEMA IF EXISTS public CASCADE;',
	});
	await database.query({
		text: 'CREATE SCHEMA public;',
	});

	const migrationsController = new MigrationsController();
	await migrationsController.runPedentMigrations();
});
