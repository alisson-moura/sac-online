import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/http/middlewares/auth";
import { rolesSchema } from "@sac/authorization";

export async function getPendingInvites(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/invites', {
            schema: {
                tags: ['Invites'],
                security: [{ bearerAuth: [] }],
                summary: 'Get all user pendings invites',
                response: {
                    200: z.object({
                        invites: z.array(
                            z.object({
                                id: z.string().uuid(),
                                email: z.string().email(),
                                role: rolesSchema,
                                createdAt: z.date(),
                                author: z.object({
                                    id: z.string().uuid(),
                                    name: z.string().nullable(),
                                }),
                                organization: z.object({
                                    name: z.string()
                                })
                            })
                        )
                    })
                }
            }
        }, async (request, reply) => {
            const userId = await request.getCurrentUserId()
            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const invites = await prisma.invite.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    organization: {
                        select: {
                            name: true
                        }
                    }
                },
                where: {
                    email: user.email
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return reply.status(200).send({
                invites
            })
        })
}