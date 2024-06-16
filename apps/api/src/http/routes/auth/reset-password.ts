import { UnauthorizedError } from "@/http/errors/unauthorized";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function resetPassword(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/password/reset', {
            schema: {
                tags: ['Auth'],
                summary: 'Reset password',
                body: z.object({
                    code: z.string().uuid(),
                    password: z.string().min(6)
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { code, password } = request.body

            const tokenFromCode = await prisma.token.findUnique({
                where: {
                    id: code
                }
            })
            if (tokenFromCode == null)
                throw new UnauthorizedError()

            const passwordHash = await hash(password, 8)
            await prisma.user.update({
                where: {
                    id: tokenFromCode.userId
                },
                data: {
                    passwordHash
                }
            })


            return reply.status(204).send()
        })
}