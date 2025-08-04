import { db } from "@/infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  const database = {
    version: "0",
    conexoes: 0,
    status: "up",
  };

  try {
    const {
      rows: [dbVersion],
    } = await db.execute<{ server_version: string }>("SHOW server_version");
    const {
      rows: [dbConnections],
    } = await db.execute<{ conexoes: number }>(
      "SELECT count(*)::int AS conexoes FROM pg_stat_activity"
    );

    database.conexoes = dbConnections.conexoes;
    database.version = dbVersion.server_version;
  } catch (error) {
    console.error(error);
    database.status = "down";
  }

  return NextResponse.json({
    updated_at: new Date().toISOString(),
    database,
  });
}
