import { pool } from "@/infra/database";
import { runMigrations } from "@/infra/database/migrate";
import { randomUUID } from "crypto";

const uuid = randomUUID().split("-");
const schema = `test_${uuid[0]}`;
process.env.POSTGRES_SCHEMA = schema;

beforeEach(async () => {
  const client = await pool.connect();

  await client.query({
    text: `CREATE SCHEMA IF NOT EXISTS ${schema}`,
  });

  await runMigrations();

  client.release();
});

afterEach(async () => {
  const client = await pool.connect();
  await client.query({
    text: `DROP SCHEMA IF EXISTS ${schema} CASCADE`,
  });
  client.release();
});

afterAll(async () => {
  await pool.end();
});
