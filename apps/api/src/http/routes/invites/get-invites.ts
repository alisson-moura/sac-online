import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";
import { rolesSchema } from "@sac/authorization";

export async function getInvites(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/organizations/:slug/invites', {
            schema: {
                tags: ['Invites'],
                summary: 'Get all organization invites',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
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
                                })
                            })
                        )
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('get', 'InviteSubject')) throw new UnauthorizedError()

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
                    }
                },
                where: {
                    organizationId: organization.id
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