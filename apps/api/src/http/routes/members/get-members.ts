import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function getMembers(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/organizations/:slug/members', {
            schema: {
                tags: ['Members'],
                summary: 'Get all organization members',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        members: z.array(
                            z.object({
                                id: z.string().uuid(),
                                userId: z.string().uuid(),
                                name: z.string().nullable(),
                                email: z.string(),
                                avatarUrl: z.string().nullable(),
                                role: z.string(),
                            })
                        )
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('view', 'UserSubject')) throw new UnauthorizedError()

            const members = await prisma.member.findMany({
                select: {
                    id: true,
                    role: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatarUrl: true
                        }
                    }
                },
                where: {
                    organizationId: organization.id
                },
                orderBy: [
                    {
                        role: 'asc'
                    },
                    {
                        user: {
                            name: 'asc'
                        }
                    }
                ]
            })

            const membersWithUserAndRole = members.map(({user, ...member}) => ({
                userId: user.id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                ...member
            }))

            return reply.status(200).send({
                members: membersWithUserAndRole
            })
        })
}