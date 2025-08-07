import { env } from "@/lib/env";
import { pool } from "./pool";
import { PoolClient, QueryConfig, QueryResult, QueryResultRow } from "pg";

class Transaction {
  private client: PoolClient | null = null;
  private readonly schema: string;

  constructor() {
    this.schema = process.env.PGSCHEMA ?? "public";
  }

  async begin(): Promise<void> {
    if (this.client) {
      throw new Error("A transaction is already in progress.");
    }
    this.client = await pool.connect();
    try {
      await this.client.query(`SET search_path TO ${this.schema}`);
      await this.client.query("BEGIN");
    } catch (error) {
      this.releaseClient();
      console.error("Failed to begin transaction:", error);
      throw error;
    }
  }

  async query<T extends QueryResultRow>(input: QueryConfig): Promise<T[]> {
    if (!this.client) {
      throw new Error("Transaction has not been started. Call begin() first.");
    }
    try {
      const res: QueryResult<T> = await this.client.query<T>(
        input.text,
        input.values
      );
      return res.rows;
    } catch (error) {
      console.error("Error executing query within transaction:", error);
      throw error;
    }
  }

  async commit(): Promise<void> {
    if (!this.client) {
      throw new Error("Transaction has not been started.");
    }
    try {
      await this.client.query("COMMIT");
    } catch (error) {
      console.error("Failed to commit transaction:", error);
      throw error;
    } finally {
      this.releaseClient();
    }
  }

  async rollback(): Promise<void> {
    if (!this.client) {
      return;
    }
    try {
      await this.client.query("ROLLBACK");
    } catch (error) {
      console.error("Failed to rollback transaction:", error);
    } finally {
      this.releaseClient();
    }
  }

  private releaseClient(): void {
    if (this.client) {
      this.client.release();
      this.client = null;
    }
  }
}

export const transaction = new Transaction();
