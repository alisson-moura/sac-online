import { runner } from "node-pg-migrate";
import { ClientBase } from "pg";

export async function runMigrations({
  schema,
  dbClient,
}: {
  schema: string;
  dbClient: ClientBase;
}): Promise<void> {
  console.log(schema);
  await runner({
    createSchema: true,
    dbClient,
    schema,
    verbose: false,
    dir: "infra/database/migrations",
    direction: "up",
    migrationsTable: "pgmigrations",
  });
}
