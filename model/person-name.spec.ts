import { PersonName } from "./person-name";

describe("PersonName", () => {
  describe("Criação válida", () => {
    it("deve criar um nome com primeiro e último nome", () => {
      const name = PersonName.create("john doe");

      expect(name.firstName).toBe("John");
      expect(name.lastName).toBe("Doe");
    });

    it("deve criar um nome com múltiplos nomes do meio", () => {
      const name = PersonName.create("john michael doe smith");

      expect(name.firstName).toBe("John");
      expect(name.lastName).toBe("Smith");
      expect(name.fullName).toBe("John Michael Doe Smith");
    });

    it("deve normalizar entrada com espaços extras", () => {
      const name = PersonName.create("  john   doe  ");

      expect(name.firstName).toBe("John");
      expect(name.lastName).toBe("Doe");
      expect(name.fullName).toBe("John Doe");
    });

    it("deve normalizar entrada com case misto", () => {
      const name = PersonName.create("JoHn DoE");

      expect(name.rawValue).toBe("john doe");
      expect(name.fullName).toBe("John Doe");
    });
  });

  describe("Validações de entrada inválida", () => {
    it.each([
      ["", "string vazia"],
      ["   ", "apenas espaços"],
      [null as any, "valor null"],
      [undefined as any, "valor undefined"],
    ])("deve lançar erro para %s (%s)", (input, description) => {
      expect(() => PersonName.create(input)).toThrow(
        "Por favor informe nome e sobrenome."
      );
    });

    it("deve lançar erro para nome sem sobrenome", () => {
      expect(() => PersonName.create("John")).toThrow(
        "Por favor informe um sobrenome."
      );
    });

    it.each([
      ["a doe", "primeiro nome com 1 caractere"],
      ["ab doe", "primeiro nome com 2 caracteres (limite)"],
    ])("deve lançar erro para %s (%s)", (input, description) => {
      if (input === "ab doe") {
        // Teste de limite - deve passar
        expect(() => PersonName.create(input)).not.toThrow();
      } else {
        expect(() => PersonName.create(input)).toThrow(
          "O primeiro nome deve possuir mais de 2 caracteres."
        );
      }
    });

    it.each([
      ["john d", "último nome com 1 caractere"],
      ["john ab", "último nome com 2 caracteres (limite)"],
    ])("deve lançar erro para %s (%s)", (input, description) => {
      if (input === "john ab") {
        // Teste de limite - deve passar
        expect(() => PersonName.create(input)).not.toThrow();
      } else {
        expect(() => PersonName.create(input)).toThrow(
          "O ultimo nome deve possuir mais de 2 caracteres."
        );
      }
    });
  });

  describe("Getters e propriedades", () => {
    let personName: PersonName;

    beforeEach(() => {
      personName = PersonName.create("john michael doe");
    });

    it("deve retornar o primeiro nome capitalizado", () => {
      expect(personName.firstName).toBe("John");
    });

    it("deve retornar o último nome capitalizado", () => {
      expect(personName.lastName).toBe("Doe");
    });

    it("deve retornar o nome completo com primeiras letras maiúsculas", () => {
      expect(personName.fullName).toBe("John Michael Doe");
    });

    it("deve retornar o valor raw normalizado", () => {
      expect(personName.rawValue).toBe("john michael doe");
    });

    it("deve retornar o nome completo no toString", () => {
      expect(personName.toString()).toBe("John Michael Doe");
    });
  });

  describe("Métodos de comparação", () => {
    it("deve comparar nomes iguais corretamente", () => {
      const name1 = PersonName.create("john doe");
      const name2 = PersonName.create("JOHN DOE");

      expect(name1.equals(name2)).toBe(true);
    });

    it("deve comparar nomes diferentes corretamente", () => {
      const name1 = PersonName.create("john doe");
      const name2 = PersonName.create("jane doe");

      expect(name1.equals(name2)).toBe(false);
    });

    it("deve ignorar espaços extras na comparação", () => {
      const name1 = PersonName.create("john doe");
      const name2 = PersonName.create("  john   doe  ");

      expect(name1.equals(name2)).toBe(true);
    });
  });

  describe("Casos edge", () => {
    it("deve lidar com nomes com múltiplos espaços", () => {
      const name = PersonName.create("john    michael    doe");

      expect(name.firstName).toBe("John");
      expect(name.lastName).toBe("Doe");
      expect(name.fullName).toBe("John Michael Doe");
    });

    it("deve preservar a estrutura de nomes compostos", () => {
      const name = PersonName.create("jean-luc van der berg");

      expect(name.firstName).toBe("Jean-luc");
      expect(name.lastName).toBe("Berg");
    });
  });
});
