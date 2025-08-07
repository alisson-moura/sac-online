import { AppError } from "./app-error";

export class EmailAlreadyInUseError extends AppError{
  constructor() {
    super('Este e-mail já está em uso por outro usuário.');
    this.name = 'EmailAlreadyInUseError';
  }
}

export class PhoneAlreadyInUseError extends AppError{
  constructor() {
    super('Este celular já está em uso por outro usuário.');
    this.name = 'PhoneAlreadyInUseError';
  }
}