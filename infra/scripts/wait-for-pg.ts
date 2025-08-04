import('child_process').then(({ exec }) => {
    function checkPostgres() {
        exec('docker exec database pg_isready --host localhost', handleIsReady);

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
});
