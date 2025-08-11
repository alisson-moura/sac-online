import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("user", {
    id: { type: "text", primaryKey: true },
    name: { type: "text", notNull: false },
    email: { type: "text", notNull: true },
    mobilePhone: { type: "varchar(100)", notNull: true, unique: true },
    emailVerified: { type: "boolean", notNull: false },
    image: { type: "text", notNull: false },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    status: {
      type: "status",
      notNull: true,
      default: "active",
    },
  });

  pgm.createTable("session", {
    id: { type: "text", primaryKey: true },
    userId: {
      type: "text",
      notNull: true,
      references: '"user"',
    },
    token: { type: "text", notNull: true },
    expiresAt: { type: "timestamp", notNull: true },
    ipAddress: { type: "text", notNull: false },
    userAgent: { type: "text", notNull: false },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createTable("account", {
    id: { type: "text", primaryKey: true },
    userId: {
      type: "text",
      notNull: true,
      references: '"user"',
    },
    accountId: { type: "text", notNull: true },
    providerId: { type: "text", notNull: true },
    accessToken: { type: "text", notNull: false },
    refreshToken: { type: "text", notNull: false },
    accessTokenExpiresAt: { type: "timestamp", notNull: false },
    refreshTokenExpiresAt: { type: "timestamp", notNull: false },
    scope: { type: "text", notNull: false },
    idToken: { type: "text", notNull: false },
    password: { type: "text", notNull: false },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createTable("verification", {
    id: { type: "text", primaryKey: true },
    identifier: { type: "text", notNull: true },
    value: { type: "text", notNull: true },
    expiresAt: { type: "timestamp", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
}
