import { Password } from "./password";
import bcrypt from 'bcrypt';

jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe("Password", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedBcrypt.hash.mockResolvedValue("mocked-hash" as never);
  });

  describe("isValid", () => {
    it("deve validar senhas corretas", () => {
      expect(Password.isValid("Password123!")).toBe(true);
      expect(Password.isValid("MyStr0ng@Pass")).toBe(true);
    });

    it("deve invalidar senhas fracas", () => {
      expect(Password.isValid("password")).toBe(false);
      expect(Password.isValid("PASSWORD123")).toBe(false);
      expect(Password.isValid("Pass123")).toBe(false);
      expect(Password.isValid("")).toBe(false);
      expect(Password.isValid(null as any)).toBe(false);
    });
  });

  describe("fromText", () => {
    it("deve criar password com senha válida", async () => {
      const password = await Password.fromText("ValidPass123!");
      
      expect(password.value).toBe("mocked-hash");
      expect(bcrypt.hash).toHaveBeenCalledWith("ValidPass123!", 12);
    });

    it("deve rejeitar senha inválida", async () => {
      await expect(Password.fromText("weak")).rejects.toThrow(
        "Senha muito fraca"
      );
    });
  });

  describe("fromHash", () => {
    it("deve criar password com hash fornecido", () => {
      const password = Password.fromHash("existing-hash");
      expect(password.value).toBe("existing-hash");
    });
  });

  describe("compare", () => {
    it("deve comparar senhas corretamente", async () => {
      mockedBcrypt.compare.mockResolvedValue(true as never);
      const password = Password.fromHash("hash");
      
      const result = await password.compare("correct-password");
      
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith("correct-password", "hash");
    });

    it("deve retornar false para entradas inválidas", async () => {
      const password = Password.fromHash("hash");
      
      expect(await password.compare("")).toBe(false);
      expect(await password.compare(null as any)).toBe(false);
    });
  });
});