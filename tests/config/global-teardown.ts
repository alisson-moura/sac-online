// tests/config/global-teardown.ts
import { pool } from "@/infra/database/pool"; // Ajuste o caminho para a sua pool

export default async () => {
  await pool.end();
};
