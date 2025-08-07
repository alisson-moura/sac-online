import { UserRepository } from "@/model/user-repository";
import { User } from "@/model/user";
import { Email } from "@/model/email";
import { MobilePhone } from "@/model/mobile-phone";
import { transaction } from "@/infra/database/transaction";
import { query } from "@/infra/database/query";

export class PgUserRepository implements UserRepository {
  constructor() {}
  async checkAvailability(email: Email, phone: MobilePhone) {
    const stm = `
      SELECT 
        COUNT(CASE WHEN email = $1 THEN 1 END) as email_count,
        COUNT(CASE WHEN mobile_phone = $2 THEN 1 END) as phone_count
      FROM users 
      WHERE email = $1 OR mobile_phone = $2
    `;

    const result = await query.findFirst<{
      email_count: number;
      phone_count: number;
    }>({
      text: stm,
      values: [email.full, phone.rawValue],
    });

    return {
      emailAvailable: result?.email_count == 0,
      phoneAvailable: result?.phone_count == 0,
    };
  }
  async create(user: User): Promise<void> {
    try {
      await transaction.begin();
      await transaction.query({
        text: `INSERT INTO users (name, email, mobile_phone, hash) VALUES ($1, $2, $3, $4)`,
        values: [
          user.name.rawValue,
          user.email.full,
          user.mobilePhone.rawValue,
          user.password.value,
        ],
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error("Erro ao salvar usuário, rollback executado:", error);
      throw error;
    }
  }
}
