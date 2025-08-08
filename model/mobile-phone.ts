import { ValidationError } from "@/errors/validation-error";

export class MobilePhone {
  private static readonly REGEX =
    /^(?:\+55\s?)?(?:\()?(?:0?[1-9]{2})(?:\))?[\s\-]?9[0-9]{4}[\s\-]?[0-9]{4}$/;

  private static readonly COUNTRY_CODE = "55";

  private readonly value: string;

  private constructor(value: string) {
    this.value = this.extractDigits(value);
  }

  public static create(value: string): MobilePhone {
    if (!value || typeof value !== "string") {
      throw new ValidationError("Número de celular é obrigatório.");
    }

    if (!this.isValid(value)) {
      throw new ValidationError(
        "Formato de celular inválido. Use o formato brasileiro (11) 99999-9999."
      );
    }

    return new MobilePhone(value);
  }

  private static isValid(phone: string): boolean {
    return this.REGEX.test(phone.trim());
  }

  private extractDigits(phone: string): string {
    const digits = phone.replace(/\D/g, "");

    // Remove código do país se presente (55)
    const cleanDigits = digits.startsWith(MobilePhone.COUNTRY_CODE)
      ? digits.substring(2)
      : digits;

    // Adiciona código do país para padronizar
    return MobilePhone.COUNTRY_CODE + cleanDigits;
  }

  get rawValue(): string {
    return this.value;
  }

  get digits(): string {
    return this.value;
  }

  get areaCode(): string {
    // Pula o código do país (55) e pega os 2 próximos dígitos
    return this.value.substring(2, 4);
  }

  get number(): string {
    // Pula código do país (55) e código de área (2 dígitos)
    return this.value.substring(4);
  }

  get formatted(): string {
    const areaCode = this.areaCode;
    const phoneNumber = this.number;

    return `(${areaCode}) ${phoneNumber.substring(
      0,
      5
    )}-${phoneNumber.substring(5)}`;
  }

  get withCountryCode(): string {
    return `+${this.value}`;
  }

  get withFormattedCountryCode(): string {
    return `+${MobilePhone.COUNTRY_CODE} ${this.formatted}`;
  }

  public equals(other: MobilePhone): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.formatted;
  }
}
