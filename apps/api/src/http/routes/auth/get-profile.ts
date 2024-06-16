import { UnauthorizedError } from "@/http/errors/unauthorized";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getProfile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/profile', {
            schema: {
                tags: ['Auth'],
                summary: 'Get authenticated user profile',
                response: {
                    200: z.object({
                        user: z.object({
                            id: z.string().uuid(),
                            name: z.string().nullable(),
                            email: z.string().email(),
                            avatarUrl: z.string().url().nullable()
                        })
                    })
                }
            }
        }, async (request, reply) => {
            const id = await request.getCurrentUserId()
            const user = await prisma.user.findUnique({
                select: {
                    id: true,
                    avatarUrl: true,
                    email: true,
                    name: true
                },
                where: {
                    id
                }
            })
            if (user == null)
                throw new UnauthorizedError()


            return reply.status(200).send({
                user
            })
        })
}