import bcrypt from 'bcrypt';

export class Password {
    /**
     * Regex para validar a força da senha.
     * Requisitos:
     * - Pelo menos 8 caracteres de comprimento
     * - Pelo menos uma letra minúscula (a-z)
     * - Pelo menos uma letra maiúscula (A-Z)
     * - Pelo menos um número (0-9)
     * - Pelo menos um caractere especial (!@#$%^&*)
     */
    static readonly REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    /**
     * O valor do objeto é sempre o hash da senha.
     */
    public readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    /**
     * Cria uma nova instância de Password a partir de uma senha em texto plano.
     * Valida a força da senha e então gera o hash.
     * Este método é assíncrono porque o hashing é uma operação computacionalmente intensiva.
     * @param value A senha em texto plano.
     * @returns Uma Promise que resolve para uma nova instância de Password.
     */
    static async fromText(value: string): Promise<Password> {
        if (!this.isValid(value)) {
            throw new Error(
                'Senha muito fraca. Deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
            );
        }
        const hashedPassword = await bcrypt.hash(value, 12);
        return new Password(hashedPassword);
    }

    /**
     * Cria uma instância de Password a partir de um hash pré-existente.
     * @param hash O hash da senha.
     * @returns Uma nova instância de Password.
     */
    static fromHash(hash: string): Password {
        return new Password(hash);
    }

    /**
     * Valida se uma string de senha atende aos critérios de segurança.
     * @param password A senha em texto plano a ser validada.
     * @returns `true` se a senha for válida, `false` caso contrário.
     */
    static isValid(password: string): boolean {
        if (!password) {
            return false;
        }
        return this.REGEX.test(password);
    }

    /**
     * Compara uma senha em texto plano com o hash armazenado nesta instância.
     * @param plainTextPassword A senha em texto plano a ser comparada.
     * @returns Uma Promise que resolve para `true` se as senhas corresponderem, `false` caso contrário.
     */
    async compare(plainTextPassword: string): Promise<boolean> {
        if (!plainTextPassword || !this.value) {
            return false;
        }
        return bcrypt.compare(plainTextPassword, this.value);
    }
}
