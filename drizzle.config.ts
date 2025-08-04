import "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";

export default defineConfig({
  schema: "./infra/database/schema",
  out: "./infra/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
    ssl: env.POSTGRES_CA
      ? {
          rejectUnauthorized: true,
          ca: env.POSTGRES_CA,
        }
      : false,
  },
  verbose: true,
  strict: true,
});
