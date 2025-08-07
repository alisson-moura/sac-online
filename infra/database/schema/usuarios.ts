import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const statusUsuarioEnum = pgEnum("status_usuario_enum", [
  "ativo",
  "inativo",
]);

export const usuarios = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  hash: text("hash").notNull(),
  email: text("email").notNull().unique(),
  celular: text("celular").notNull().unique(),
  ultimoAcesso: timestamp("ultimo_acesso"),
  status: statusUsuarioEnum("status").default("ativo").notNull(),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
  atualizadoEm: timestamp("atualizado_em")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
