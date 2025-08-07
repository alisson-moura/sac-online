import { Email } from "./email";
import { EntityId } from "./entity-id";
import { MobilePhone } from "./mobile-phone";
import { Password } from "./password";
import { PersonName } from "./person-name";
import { Status } from "./status";

export class User {
  public constructor(
    public props: {
      id: EntityId;
      status: Status;
      email: Email;
      name: PersonName;
      password: Password;
      mobilePhone: MobilePhone;
      createdAt: Date;
      updatedAt: Date;
      lastAccess: Date | null;
    }
  ) {}

  public async checkCredentials(
    email: Email,
    plainPassword: string
  ): Promise<boolean> {
    const isPasswordMatch = await this.props.password.compare(plainPassword);
    const isEmailMatch = this.props.email.equals(email);
    if (isPasswordMatch && isEmailMatch) {
      this.props.lastAccess = new Date();
      return true;
    }
    return false;
  }

  public resetPassword(password: Password) {
    this.props.password = password;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  public get id(): EntityId {
    return this.props.id;
  }

  public get status(): Status {
    return this.props.status;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get name(): PersonName {
    return this.props.name;
  }

  public get mobilePhone(): MobilePhone {
    return this.props.mobilePhone;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get lastAccess(): Date | null {
    return this.props.lastAccess;
  }

  public get password(): Password {
    return this.props.password;
  }
}
