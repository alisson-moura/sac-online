import { Injectable } from '@nestjs/common';
import { Client, QueryConfig } from 'pg';

@Injectable()
export class Database {
	private getClient(): Client {
		return new Client({
			host: process.env.POSTGRES_HOST,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
		});
	}

	async query(input: QueryConfig) {
		const client = this.getClient();
		await client.connect();
		try {
			const result = await client.query(input);
			return result;
		} catch (error) {
			console.error(error);
		} finally {
			await client.end();
		}
	}
}
