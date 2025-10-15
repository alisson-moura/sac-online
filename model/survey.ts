import { ValidationError } from "@/errors/validation-error";
import { randomUUID } from "node:crypto";
import { Status } from "./status";
import { th } from "zod/v4/locales";
import { Question } from "./question";

export class Survey {
  private id: string = randomUUID();
  private title: string = "";
  private description: string = "";
  private status: Status = Status.ativo();
  private questions: Question[] = [];

  public constructor(props: {
    id?: string;
    title: string;
    description: string;
    status?: Status;
  }) {
    this.setId(props.id);
    this.setTitle(props.title);
    this.setDescription(props.description);
    this.setStatus(props.status);
  }

  public setId(id?: string): void {
    if (id) {
      this.id = id;
    }
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    const titleLength = title.trim().length;
    if (titleLength < 10 || titleLength > 140) {
      throw new ValidationError(
        "O título deve conter entre 10 e 140 caracteres."
      );
    }

    this.title = title.trim();
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    const descriptionLength = description.trim().length;

    if (descriptionLength < 100 || descriptionLength > 340) {
      throw new ValidationError(
        "A descrição deve conter entre 100 e 340 caracteres."
      );
    }

    this.description = description.trim();
  }

  public setStatus(status?: Status) {
    if (status) this.status = status;
  }

  public getStatus() {
    return this.status.getValue();
  }

  public setQuestions(questions: Question[]): void {
    // ETAPA 1: Remover questões com 'framing' duplicado usando um Map.
    // Isso garante que a última questão com um framing específico prevaleça.
    const uniqueFramingMap = new Map<string, Question>();
    for (const question of questions) {
      uniqueFramingMap.set(question.getFraming().trim(), question);
    }
    let uniqueQuestions = Array.from(uniqueFramingMap.values());

    // ETAPA 2: Ordenar as questões únicas pela sua ordem original.
    uniqueQuestions.sort((a, b) => a.getOrder() - b.getOrder());

    // ETAPA 3: Reatribuir a ordem para garantir uma sequência limpa (0, 1, 2, ...).
    // Esta é a forma mais segura de garantir que não haverá ordens duplicadas.
    uniqueQuestions.forEach((question, index) => {
      question.setOrder(index);
    });

    // ETAPA 4: Atribuir a lista final, limpa e ordenada, à propriedade da classe.
    this.questions = uniqueQuestions;
  }
}
