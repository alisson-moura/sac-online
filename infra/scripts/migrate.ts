import { pool } from "../database/pool";
import { runMigrations } from "../database/run-migrations";

async function main() {
  const client = await pool.connect();
  try {
    console.log("🔌 Conectando ao banco de dados...");

    const schema = process.env.PGSCHEMA || "public";

    console.log("🚀 Executando migrações...");
    await runMigrations({
      schema,
      dbClient: client,
    });

    console.log("✅ Migrações executadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao executar migrações:", error);
    process.exit(1);
  } finally {
    console.log("🔌 Fechando conexão com o banco...");
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Erro fatal:", error);
    process.exit(1);
  });
}
