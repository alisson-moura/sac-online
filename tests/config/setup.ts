import { pool } from "@/infra/database/pool";

beforeEach(async () => {
  const client = await pool.connect();
  await client.query("DELETE FROM users");
});
