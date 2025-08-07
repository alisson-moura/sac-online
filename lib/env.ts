import { config } from "dotenv";
import { z } from "zod/v4";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PGUSER: z.string().min(1, "PGUSER é obrigatório"),
  PGPASSWORD: z.string().min(1, "PGPASSWORD é obrigatório"),
  PGDATABASE: z.string().min(1, "PGDATABASE é obrigatório"),
  PGHOST: z.string().min(1, "PGHOST é obrigatório"),
  PGCA: z.string().optional(),
  PGPORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535, "PGPORT deve ser um número válido entre 1 e 65535"),
  DATABASE_URL: z.url("DATABASE_URL deve ser uma URL válida"),
  PORT: z.coerce.number().positive().default(3000),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Erro nas variáveis de ambiente:");
      console.error(z.prettifyError(error));
    }

    process.exit(1);
  }
}

export const env = validateEnv();

export const isDev = env.NODE_ENV === "development";
export const isProd = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
