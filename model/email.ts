import z from "zod";

export class Email {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    const email = value.trim().toLowerCase();

    const data = z
      .email({
        error: "E-mail fornecido é inválido.",
      })
      .parse(email);

    return new Email(data);
  }

  get domain(): string {
    const [_, domain] = this.value.split("@");
    return domain;
  }

  get username(): string {
    const [username] = this.value.split("@");
    return username;
  }

  get full() {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}
