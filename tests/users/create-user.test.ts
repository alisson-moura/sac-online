import { eq } from "drizzle-orm";
import { db } from "@/infra/database";
import { usuarios } from "@/infra/database/schema";
import { PgUserRepository } from "@/infra/database/repositories/user-repository";
import { CreateUser } from "@/use-cases/users/create-user";
import {
  EmailAlreadyInUseError,
  PhoneAlreadyInUseError,
} from "@/errors/user-errors";

describe("CreateUser Use Case", () => {
  let createUser: CreateUser;
  let userRepository: PgUserRepository;

  const validInput = {
    email: "teste@exemplo.com",
    senha: "Senha@123",
    nome: "João Silva",
    telefone: "+5511999999999",
  };

  beforeEach(() => {
    userRepository = new PgUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it("deve criar um usuário com dados válidos", async () => {
    await createUser.handle(validInput);

    const userInDb = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, validInput.email))
      .limit(1);

    expect(userInDb).toHaveLength(1);
  });

  it("deve lançar EmailAlreadyInUseError quando email já existe", async () => {
    await createUser.handle(validInput);

    const duplicateEmailInput = {
      ...validInput,
      telefone: "+5511988888888",
      nome: "Outro Nome",
    };

    expect(async () =>  await createUser.handle(duplicateEmailInput)).rejects.toThrow(
      EmailAlreadyInUseError
    );
  });

  it("deve lançar PhoneAlreadyInUseError quando telefone já existe", async () => {
    await createUser.handle(validInput);

    const duplicatePhoneInput = {
      ...validInput,
      email: "outro@exemplo.com",
      nome: "Outro Nome",
    };

    expect(async () => await createUser.handle(duplicatePhoneInput)).rejects.toThrow(
      PhoneAlreadyInUseError
    );
  });
});
