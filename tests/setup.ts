import { randomUUID } from "crypto";
import { pool } from "@/infra/database/pool";
import { runMigrations } from "@/infra/database/run-migrations";

const uuid = randomUUID().split("-");
const schema = `test_${uuid[0]}`;
process.env.PGSCHEMA = schema;

beforeEach(async () => {
  const client = await pool.connect();

  await client.query({
    text: `CREATE SCHEMA IF NOT EXISTS ${schema}`,
  });

  try {
    await runMigrations({
      schema: schema,
      dbClient: client,
    });
  } finally {
    client.release();
  }
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
