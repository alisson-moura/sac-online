CREATE TYPE "public"."status_usuario_enum" AS ENUM('ativo', 'inativo');--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"hash" text NOT NULL,
	"email" text NOT NULL,
	"ultimo_acesso" timestamp,
	"status" "status_usuario_enum" DEFAULT 'ativo' NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"atualizado_em" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
