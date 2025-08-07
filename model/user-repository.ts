import { Email } from "./email";
import { MobilePhone } from "./mobile-phone";
import { User } from "./user";

export interface UserRepository {
  create(user: User): Promise<void>;
  checkAvailability(
    email: Email,
    phone: MobilePhone
  ): Promise<{
    emailAvailable: boolean;
    phoneAvailable: boolean;
  }>;
}
