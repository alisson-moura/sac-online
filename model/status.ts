export type StatusValue = 'ativo' | 'inativo';

export class InvalidStatusError extends Error {
  constructor(invalidValue: string) {
    super(`O valor "${invalidValue}" é um status inválido. Os valores aceitos são "ativo" ou "inativo".`);
    this.name = 'InvalidStatusError';
  }
}

export class Status {
  private readonly value: StatusValue;

  private constructor(value: StatusValue) {
    this.value = value;
  }

  /**
   * Método de fábrica principal para criar um Status a partir de uma string.
   * Valida o valor de entrada antes de criar a instância.
   *
   * @param {string} value - O valor a ser validado ('ativo' ou 'inativo').
   * @returns {Status} Uma nova instância de Status.
   * @throws {InvalidStatusError} se o valor for inválido.
   */
  public static create(value: string): Status {
    const status = value.toLowerCase().trim()

    if (status !== 'ativo' && status !== 'inativo') {
      throw new InvalidStatusError(value);
    }
    return new Status(status as StatusValue);
  }

  public static ativo(): Status {
    return new Status('ativo');
  }

  public static inativo(): Status {
    return new Status('inativo');
  }

  public getValue(): StatusValue {
    return this.value;
  }

  public isAtivo(): boolean {
    return this.value === 'ativo';
  }

  public isInativo(): boolean {
    return this.value === 'inativo';
  }

  /**
   * Compara este Status com outro para verificar a igualdade.
   *
   * @param {Status | undefined | null} other - O outro objeto Status para comparar.
   * @returns {boolean} `true` se os valores forem iguais, `false` caso contrário.
   */
  public equals(other?: Status | null): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this.value === other.getValue();
  }

  /**
   * Representação em string do objeto, útil para logs e debug.
   * @returns {string}
   */
  public toString(): string {
    return this.value;
  }
}