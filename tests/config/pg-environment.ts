import type { Config } from "@jest/types";
import { execSync } from "node:child_process";
import dotenv from "dotenv";
import NodeEnvironment from "jest-environment-node";
import { Client } from "pg";
import crypto from "node:crypto";

dotenv.config({ path: ".env.test" });

export default class TestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(
    config: {
      projectConfig: Config.ProjectConfig;
      globalConfig: Config.GlobalConfig;
    },
    context: any
  ) {
    super(config, context);

    const dbUser = process.env.PGUSER;
    const dbPass = process.env.PGDATABASE;
    const dbHost = process.env.PGHOST;
    const dbPort = process.env.PGPORT;
    const dbName = process.env.PGDATABASE;

    this.schema = `test_${crypto.randomUUID().split("-")[0]}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    execSync("dotenv -e .env.test -- pnpm db:migrate up");

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
