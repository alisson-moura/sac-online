import('child_process').then(({ exec }) => {
    const args = process.argv.slice(2);
    const containerName = args[0] || 'database';
    const port = args[1] || '5432';

    function checkPostgres() {
        exec(`docker ps --filter "name=${containerName}" --format "{{.Names}}"`, (error, stdout) => {
            if (!stdout.trim()) {
                console.log(`\n❌ Container '${containerName}' não está rodando!`);
                process.exit(1);
            }
            
            exec(`docker exec ${containerName} pg_isready --host localhost --port 5432`, handleIsReady);
        });

        function handleIsReady(_error: unknown, stdout: string) {
            if (stdout.search('accepting connections') === -1) {
                process.stdout.write('.');
                setTimeout(checkPostgres, 1000);
                return;
            }
            console.log(`\n🟢 PostgreSQL no container '${containerName}' (porta ${port}) está pronto!\n`);
        }
    }

    console.log(`\n🔴 Aguardando PostgreSQL no container '${containerName}' (porta ${port}) aceitar conexões...`);
    checkPostgres();
});