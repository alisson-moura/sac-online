export class PersonName {
  private static readonly MIN_NAME_LENGTH = 2;
  private static readonly MIN_NAMES_REQUIRED = 2;

  private value: string;

  private constructor(value: string) {
    this.validate(value);
    this.value = this.normalize(value);
  }

  public static create(value: string) {
    return new PersonName(value);
  }

  private validate(value: string) {
    if (!value || value.trim().length === 0)
      throw new Error("Por favor informe nome e sobrenome.");

    const names = this.splitNames(value);

    if (names.length < PersonName.MIN_NAMES_REQUIRED)
      throw new Error("Por favor informe um sobrenome.");

    if (names[0].length < PersonName.MIN_NAME_LENGTH)
      throw new Error("O primeiro nome deve possuir mais de 2 caracteres.");

    if (names[names.length - 1].length < PersonName.MIN_NAME_LENGTH)
      throw new Error("O ultimo nome deve possuir mais de 2 caracteres.");
  }

  get firstName(): string {
    const names = this.splitNames(this.value);
    return this.capitalizeFirstChar(names[0]);
  }

  get lastName(): string {
    const names = this.splitNames(this.value);
    return this.capitalizeFirstChar(names[names.length - 1]);
  }

  get fullName(): string {
    return this.value
      .split(" ")
      .map((name) => this.capitalizeFirstChar(name))
      .join(" ");
  }

  get rawValue(): string {
    return this.value;
  }

  public equals(other: PersonName): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.fullName;
  }

  private splitNames(value: string): string[] {
    return value.split(" ").filter((name) => name.length > 0);
  }

  private normalize(value: string): string {
    return value
      .trim()
      .split(" ")
      .filter((word) => word !== "")
      .map((word) => word.toLocaleLowerCase())
      .join(" ");
  }

  private capitalizeFirstChar(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
