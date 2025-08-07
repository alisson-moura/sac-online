import { pool } from "@/infra/database";
import { runMigrations } from "@/infra/database/migrate";
import type { PoolClient } from "pg";

let client: PoolClient;

beforeAll(async () => {
  client = await pool.connect();
  await runMigrations();
});

beforeEach(async () => {
  await client.query("BEGIN");
});

afterEach(async () => {
  await client.query("ROLLBACK");
});

afterAll(async () => {
  client.release();
});
