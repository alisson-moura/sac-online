import { UserRepository } from "@/model/user-repository";
import { User } from "@/model/user";
import { EntityId } from "@/model/entity-id";
import { Status } from "@/model/status";
import { Email } from "@/model/email";
import { PersonName } from "@/model/person-name";
import { Password } from "@/model/password";
import { MobilePhone } from "@/model/mobile-phone";
import {
  EmailAlreadyInUseError,
  PhoneAlreadyInUseError,
} from "@/errors/user-errors";

type CreateUserInput = {
  email: string;
  senha: string;
  nome: string;
  telefone: string;
};

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async handle(input: CreateUserInput): Promise<void> {
    const availability = await this.userRepository.checkAvailability(
      Email.create(input.email),
      MobilePhone.create(input.telefone)
    );

    if (!availability.emailAvailable) throw new EmailAlreadyInUseError();
    if (!availability.phoneAvailable) throw new PhoneAlreadyInUseError();

    const user = new User({
      id: EntityId.create(),
      status: Status.ativo(),
      email: Email.create(input.email),
      name: PersonName.create(input.nome),
      password: await Password.fromText(input.senha),
      mobilePhone: MobilePhone.create(input.telefone),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastAccess: null,
    });

    await this.userRepository.create(user);
  }
}
