import { User } from "@/model/user";
import { UserRepository } from "@/model/user-repository";
import { db } from "@/infra/database";
import { usuarios } from "@/infra/database/schema";
import {
  EmailAlreadyInUseError,
  PhoneAlreadyInUseError,
} from "@/errors/user-errors";
import { DatabaseError } from "pg";
import { eq } from "drizzle-orm";

export class PgUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    try {
      const userDbInput = {
        nome: user.name.rawValue,
        celular: user.mobilePhone.rawValue,
        email: user.email.full,
        hash: user.password.value,
        ultimoAcesso: user.lastAccess,
        status: user.status.getValue(),
        criadoEm: user.createdAt,
        atualizadoEm: user.updatedAt,
      };
      if (user.id.isNull()) {
        await db.insert(usuarios).values(userDbInput);
      } else {
        await db
          .update(usuarios)
          .set(userDbInput)
          .where(eq(usuarios.id, user.id.getValue()!));
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.cause instanceof DatabaseError &&
        error.cause.code == "23505"
      ) {
        if (error.cause.constraint == "usuarios_email_unique")
          throw new EmailAlreadyInUseError();
        if (error.cause.constraint == "usuarios_celular_unique")
          throw new PhoneAlreadyInUseError();
      }
      throw error;
    }
  }
}
