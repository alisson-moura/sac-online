import { Status, InvalidStatusError, StatusValue } from "./status";

describe("Status Value Object", () => {
  describe("Criação", () => {
    it('deve criar um status "ativo" com sucesso usando o método create', () => {
      const status = Status.create("ativo");
      expect(status).toBeInstanceOf(Status);
    });

    it('deve criar um status "inativo" com sucesso usando o método create', () => {
      const status = Status.create("inativo");
      expect(status).toBeInstanceOf(Status);
    });

    it('deve criar um status "ativo" usando o método de fábrica semântico "ativo"', () => {
      const status = Status.ativo();
      expect(status.isAtivo).toBeTruthy();
    });

    it('deve criar um status "inativo" usando o método de fábrica semântico "inativo"', () => {
      const status = Status.inativo();
      expect(status.isInativo).toBeTruthy();
    });
  });

  describe("Validação", () => {
    it("deve lançar InvalidStatusError para um valor inválido", () => {
      const invalidValue = "status_nao_existente";
      expect(() => {
        Status.create(invalidValue);
      }).toThrow(InvalidStatusError);
    });

    it("deve lançar um erro para uma string vazia", () => {
      expect(() => {
        Status.create("");
      }).toThrow(InvalidStatusError);
    });
  });

  describe("Métodos de Verificação", () => {
    it("isAtivo() deve retornar true para um status ativo", () => {
      const status = Status.ativo();
      expect(status.isAtivo()).toBe(true);
    });

    it("isInativo() deve retornar true para um status inativo", () => {
      const status = Status.inativo();
      expect(status.isInativo()).toBe(true);
    });
  });

  describe("Igualdade", () => {
    it('deve considerar dois status "ativo" como iguais', () => {
      const status1 = Status.ativo();
      const status2 = Status.create("ativo");
      expect(status1.equals(status2)).toBe(true);
    });

    it('deve considerar dois status "inativo" como iguais', () => {
      const status1 = Status.inativo();
      const status2 = Status.inativo();
      expect(status1.equals(status2)).toBe(true);
    });

    it('não deve considerar um status "ativo" e um "inativo" como iguais', () => {
      const statusAtivo = Status.ativo();
      const statusInativo = Status.inativo();
      expect(statusAtivo.equals(statusInativo)).toBe(false);
    });

    it("deve retornar false ao comparar com null ou undefined", () => {
      const status = Status.ativo();
      expect(status.equals(null)).toBe(false);
      expect(status.equals(undefined)).toBe(false);
    });
  });

  describe("toString", () => {
    it("deve retornar o valor primitivo como string", () => {
      const status: Status = Status.ativo();
      const statusValue: StatusValue = status.getValue();
      expect(status.toString()).toBe(statusValue);
      expect(`${status}`).toBe("ativo");
    });
  });
});
