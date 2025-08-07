import { NextResponse } from "next/server";
import { query } from "@/infra/database/query";

export async function GET() {
  const database = {
    version: "0",
    conexoes: 0,
    status: "up",
  };

  try {
    const dbVersion = await query.findFirst<{
      server_version: string;
    }>({ text: "SHOW server_version" });
    const dbConnections = await query.findFirst<{ conexoes: number }>({
      text: "SELECT count(*)::int AS conexoes FROM pg_stat_activity",
    });
    if (dbConnections) database.conexoes = dbConnections.conexoes;
    if (dbVersion) database.version = dbVersion.server_version;
  } catch (error) {
    console.error(error);
    database.status = "down";
  }

  return NextResponse.json({
    updated_at: new Date().toISOString(),
    database,
  });
}
