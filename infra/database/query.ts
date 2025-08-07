import { QueryConfig, QueryResultRow } from "pg";
import { pool } from "./pool";
import { env } from "@/lib/env";

class Query {
  private async executeQuery<T extends QueryResultRow>(
    input: QueryConfig
  ): Promise<T[]> {
    const client = await pool.connect();
    try {
      await client.query(
        `SET search_path TO ${process.env.PGSCHEMA ?? "public"}`
      );
      const result = await client.query<T>(input.text, input.values);
      return result.rows;
    } catch (error) {
      console.error("Erro ao executar a query:", {
        text: input.text,
        values: input.values,
        error,
      });
      throw error;
    } finally {
      client.release();
    }
  }

  public async query<T extends QueryResultRow>(
    input: QueryConfig
  ): Promise<T[]> {
    return this.executeQuery<T>(input);
  }

  public async findMany<T extends QueryResultRow>(
    input: QueryConfig
  ): Promise<T[]> {
    return this.executeQuery<T>(input);
  }

  public async findFirst<T extends QueryResultRow>(
    input: QueryConfig
  ): Promise<T | null> {
    const rows = await this.executeQuery<T>(input);
    return rows.length > 0 ? rows[0] : null;
  }
}

export const query = new Query();
