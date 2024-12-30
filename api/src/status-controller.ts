import { Controller, Get } from '@nestjs/common';
import { Database } from './infra/database';

@Controller('status')
export class StatusController {
	constructor(private database: Database) {}
	@Get()
	async getStatus() {
		const versionResult = await this.database.query({
			text: 'SHOW server_version;',
		});
		const maxConnectionsResult = await this.database.query({
			text: 'SHOW max_connections;',
		});

		const opennedConnectionsResult = await this.database.query({
			text: 'SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1',
			values: [process.env.POSTGRES_DB],
		});

		return {
			database: {
				version: parseFloat(versionResult?.rows[0].server_version),
				max_connections: parseInt(maxConnectionsResult?.rows[0].max_connections),
				openned_connections: parseInt(opennedConnectionsResult?.rows[0].count),
			},
		};
	}
}
