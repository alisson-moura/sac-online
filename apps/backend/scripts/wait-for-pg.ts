import { exec } from 'node:child_process';

function checkPostgres() {
	exec('docker exec database-sac-app pg_isready --host localhost', handleIsReady);

	function handleIsReady(_error: unknown, stdout: string) {
		if (stdout.search('accepting connections') === -1) {
			process.stdout.write('.');
			checkPostgres();
			return;
		}
		console.log('\n🟢 Postgres está pronto e aceitando conexões!\n');
	}
}

process.stdout.write('\n\n🔴 Aguardando Postgres aceitar conexões');
checkPostgres();
