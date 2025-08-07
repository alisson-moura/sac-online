import { Email } from "./email";

describe("E-mail", () => {
  it("deve criar uma instância de e-mail válida", () => {
    const emailStr = "teste@exemplo.com";
    const email = Email.create(emailStr);
    expect(email).toBeInstanceOf(Email);
  });
  it("deve converter o e-mail para minúsculas na criação", () => {
    const emailStr = "TESTE@EXEMPLO.COM";
    const email = Email.create(emailStr);
    expect(email.full).toBe("teste@exemplo.com");
  });
  it("deve remover os espaços em branco da string do e-mail", () => {
    const emailStr = "  teste@exemplo.com  ";
    const email = Email.create(emailStr);
    expect(email.full).toBe("teste@exemplo.com");
  });
  describe("Getters", () => {
    it("deve retornar o nome de usuário correto", () => {
      const email = Email.create("usuario.nome@dominio.co.uk");
      expect(email.username).toBe("usuario.nome");
    });
    it("deve retornar o domínio correto", () => {
      const email = Email.create("usuario.nome@dominio.co.uk");
      expect(email.domain).toBe("dominio.co.uk");
    });
  });
  describe("Tratamento de E-mail Inválido", () => {
    const emailsInvalidos = [
      "enderecosimples",
      "#@%^%#$@#$@#.com",
      "@exemplo.com",
      "Joe Smith <email@exemplo.com>",
      "email.exemplo.com",
      "email@exemplo@exemplo.com",
      ".email@exemplo.com",
      "email.@exemplo.com",
      "email..email@exemplo.com",
      "email@exemplo.com (Joe Smith)",
      "email@exemplo",
      "email@-exemplo.com",
      "email@111.222.333.44444",
      "email@exemplo..com",
      "Abc..123@exemplo.com",
      "”(),:;<>[@exemplo.com",
      "isso”nao”é@permitido.com",
      'isso\\ é"realmente"nao\\permitido@exemplo.com',
    ];
    it.each(emailsInvalidos)(
      "deve lançar um erro para o e-mail inválido: %s",
      (emailInvalido) => {
        expect(() => Email.create(emailInvalido)).toThrow(
          "E-mail fornecido é inválido."
        );
      }
    );
    it("deve lançar um erro para uma string vazia", () => {
      expect(() => Email.create("")).toThrow("E-mail fornecido é inválido.");
    });
  });
});
