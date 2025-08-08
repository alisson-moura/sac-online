import { PgUserRepository } from "@/infra/database/repositories/user-repository";
import { AppError } from "@/errors/app-error";
import { Email } from "@/model/email";

export async function POST(req: Request) {
  const INVALID_CREDENTIALS = {
    status: 401,
    message: "E-mail ou senha incorretos.",
  };

  try {
    const { email, senha } = await req.json();
    const emailObj = Email.create(email);

    const userRepository = new PgUserRepository();
    const user = await userRepository.getByEmail(emailObj);

    if (!user || !(await user.checkCredentials(emailObj, senha))) {
      return Response.json(INVALID_CREDENTIALS, { status: 401 });
    }

    return Response.json({ access_token: "token_de_acesso" });
  } catch (err) {
    if (err instanceof AppError) {
      return Response.json(
        { message: err.message },
        { status: err.statusCode }
      );
    }

    console.error(err);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
