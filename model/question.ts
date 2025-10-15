import { randomUUID } from "node:crypto";
import { Status } from "./status";
import { ValidationError } from "@/errors/validation-error";

/**
 * Enum para os tipos de questão disponíveis.
 */
export enum QuestionType {
  NPS = "NPS", // Net Promoter Score
  TEXT = "TEXT", // Resposta de texto livre
}

export class Question {
  private id: string = randomUUID();
  private order: number = 0;
  private framing: string = ""; // O enunciado da questão
  private type: QuestionType = QuestionType.NPS;
  private status: Status = Status.ativo();

  /**
   * Construtor da classe Question.
   * Utiliza os setters para garantir a validação dos dados na criação do objeto.
   */
  public constructor(props: {
    id?: string;
    order: number;
    framing: string;
    type: QuestionType;
    status?: Status;
  }) {
    this.setId(props.id);
    this.setOrder(props.order);
    this.setFraming(props.framing);
    this.setType(props.type);
    this.setStatus(props.status);
  }

  // --- Getters ---

  public getId(): string {
    return this.id;
  }

  public getOrder(): number {
    return this.order;
  }

  public getFraming(): string {
    return this.framing;
  }

  public getType(): QuestionType {
    return this.type;
  }

  public getStatus() {
    return this.status.getValue();
  }

  // --- Setters ---

  public setId(id?: string): void {
    if (id) {
      this.id = id;
    }
  }

  /**
   * Define a ordem da questão. A ordem não pode ser um número negativo.
   */
  public setOrder(order: number): void {
    if (order < 0) {
      throw new ValidationError("A ordem não pode ser um número negativo.");
    }
    this.order = order;
  }

  /**
   * Define o enunciado da questão, validando o seu tamanho.
   */
  public setFraming(framing: string): void {
    const framingLength = framing.trim().length;
    if (framingLength < 10 || framingLength > 200) {
      throw new ValidationError(
        "O enunciado da questão deve conter entre 10 e 200 caracteres."
      );
    }
    this.framing = framing.trim();
  }

  public setType(type: QuestionType): void {
    this.type = type;
  }

  public setStatus(status?: Status): void {
    if (status) {
      this.status = status;
    }
  }
}