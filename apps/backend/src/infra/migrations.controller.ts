import { Controller, Get, Post } from '@nestjs/common';
import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';

@Controller('migrations')
export class MigrationsController {
	constructor() {}
	@Get()
	getPedentMigrations() {
		return this.runMigrations({ dryRun: true });
	}

	@Post()
	runPedentMigrations() {
		return this.runMigrations({ dryRun: false });
	}

	private async runMigrations({ dryRun }: { dryRun: boolean }) {
		console.log(process.env.DATABASE_URL);
		const migrations = await migrationRunner({
			databaseUrl: process.env.DATABASE_URL!,
			dir: join('src', 'infra', 'migrations'),
			direction: 'up',
			migrationsTable: 'pgmigrations',
			dryRun,
		});

		return migrations;
	}
}
