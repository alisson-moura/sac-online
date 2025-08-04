import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { pool } from "@/infra/database";

export async function runMigrations() {
  await migrate(drizzle(pool), {
    migrationsFolder: "./infra/database/migrations",
  });
}
