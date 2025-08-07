import { PgUserRepository } from "@/infra/database/repositories/user-repository";
import { CreateUser } from "@/use-cases/users/create-user";
import { AppError } from "@/errors/app-error";

export async function POST(req: Request) {
  const request = await req.json();
  const userRepository = new PgUserRepository();
  const createUser = new CreateUser(userRepository);
  try {
    await createUser.handle(request);
    return Response.json({}, { status: 201 });
  } catch (err) {
    if (err instanceof AppError)
      return Response.json(
        { message: err.message },
        { status: err.statusCode }
      );

    console.error(err);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
