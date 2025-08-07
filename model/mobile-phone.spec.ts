import { MobilePhone } from "./mobile-phone";

describe("MobilePhone", () => {
  describe("create", () => {
    it("deve criar com formatos válidos", () => {
      expect(() => MobilePhone.create("(11) 99999-9999")).not.toThrow();
      expect(() => MobilePhone.create("11999999999")).not.toThrow();
      expect(() => MobilePhone.create("+55 11 99999-9999")).not.toThrow();
      expect(() => MobilePhone.create("(11)99999-9999")).not.toThrow();
    });

    it("deve rejeitar formatos inválidos", () => {
      expect(() => MobilePhone.create("")).toThrow(
        "Número de celular é obrigatório"
      );
      expect(() => MobilePhone.create(null as any)).toThrow(
        "Número de celular é obrigatório"
      );
      expect(() => MobilePhone.create("123456789")).toThrow(
        "Formato de celular inválido"
      );
      expect(() => MobilePhone.create("(11) 8999-9999")).toThrow(
        "Formato de celular inválido"
      );
      expect(() => MobilePhone.create("11888889999")).toThrow(
        "Formato de celular inválido"
      );
    });
  });

  describe("propriedades", () => {
    const phone = MobilePhone.create("11999998888");

    it("deve armazenar valor como dígitos com código do país", () => {
      expect(phone.rawValue).toBe("5511999998888");
      expect(phone.digits).toBe("5511999998888");
    });

    it("deve extrair código de área", () => {
      expect(phone.areaCode).toBe("11");
    });

    it("deve extrair número sem código do país e área", () => {
      expect(phone.number).toBe("999998888");
    });

    it("deve retornar formato brasileiro", () => {
      expect(phone.formatted).toBe("(11) 99999-8888");
    });

    it("deve retornar com código do país simples", () => {
      expect(phone.withCountryCode).toBe("+5511999998888");
    });

    it("deve retornar com código do país formatado", () => {
      expect(phone.withFormattedCountryCode).toBe("+55 (11) 99999-8888");
    });

    it("deve retornar formato brasileiro no toString", () => {
      expect(phone.toString()).toBe("(11) 99999-8888");
    });
  });

  describe("normalização de entrada", () => {
    it("deve normalizar entrada com código do país", () => {
      const phone1 = MobilePhone.create("+55 11 99999-8888");
      const phone2 = MobilePhone.create("11999998888");

      expect(phone1.rawValue).toBe("5511999998888");
      expect(phone2.rawValue).toBe("5511999998888");
      expect(phone1.equals(phone2)).toBe(true);
    });

    it("deve normalizar diferentes formatos", () => {
      const phone1 = MobilePhone.create("(11) 99999-8888");
      const phone2 = MobilePhone.create("11 99999-8888");
      const phone3 = MobilePhone.create("11999998888");

      expect(phone1.equals(phone2)).toBe(true);
      expect(phone2.equals(phone3)).toBe(true);
    });
  });

  describe("comparação", () => {
    it("deve comparar telefones iguais", () => {
      const phone1 = MobilePhone.create("(11) 99999-9999");
      const phone2 = MobilePhone.create("+5511999999999");

      expect(phone1.equals(phone2)).toBe(true);
    });

    it("deve comparar telefones diferentes", () => {
      const phone1 = MobilePhone.create("(11) 99999-9999");
      const phone2 = MobilePhone.create("(11) 98888-8888");

      expect(phone1.equals(phone2)).toBe(false);
    });
  });
});
