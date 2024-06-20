import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { ConflictRequestError } from "@/http/errors/conflict-request";
import { userSchema, organizationSchema, defineAbilityFor } from '@sac/authorization'
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function transferOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .patch('/organizations/:slug/owner', {
            schema: {
                tags: ['Organizations'],
                summary: 'Transfer organization ownership',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                body: z.object({
                    newOwnerId: z.string()
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { newOwnerId } = request.body

            const authUser = userSchema.parse({
                id: membership.userId,
                role: membership.role,
                organizationId: membership.organizationId
            })
            const authOrganization = organizationSchema.parse(organization)
            const { cannot } = defineAbilityFor(authUser)

            if (cannot('manage', authOrganization) || membership.id != organization.ownerId || organization.status == 'DEACTIVATED') {
                throw new UnauthorizedError()
            }

            const newOwner = await prisma.member.findFirst({
                where: {
                    userId: newOwnerId,
                    organizationId: organization.id
                }
            })

            if (newOwner == null)
                throw new UnauthorizedError()

            await prisma.organization.update({
                where: {
                    id: organization.id
                },
                data: {
                    ownerId: newOwnerId
                }
            })

            await prisma.member.update({
                where: {
                    id: newOwner.id
                },
                data: {
                    role: 'Gestor'
                }
            })

            return reply.status(204).send()
        })
}
