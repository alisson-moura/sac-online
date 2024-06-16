import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function requestPasswordRecover(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/password/recover', {
            schema: {
                tags: ['Auth'],
                summary: 'Request password recovery via email',
                body: z.object({
                    email: z.string().email()
                }),
                response: {
                    201: z.null()
                }
            }
        }, async (request, reply) => {
            const { email } = request.body

            const userFromEmail = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (userFromEmail == null)
                return reply.status(201).send()

            const { id } = await prisma.token.create({
                data: {
                    type: 'PASSWORD_RECOVERY',
                    userId: userFromEmail.id
                }
            })

            // send e-mail with password recover link
            console.log('Recover password token: ', id)

            return reply.status(201).send()
        })
}