import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { userSchema, organizationSchema, defineAbilityFor } from '@sac/authorization'
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function shutdownOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .delete('/organizations/:slug', {
            schema: {
                tags: ['Organizations'],
                summary: 'Delete an organization',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    202: z.object({
                        organizationId: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)

            const authUser = userSchema.parse({
                id: membership.userId,
                role: membership.role,
                organizationId: membership.organizationId
            })
            const authOrganization = organizationSchema.parse(organization)
            const { cannot } = defineAbilityFor(authUser)
            if (cannot('manage', authOrganization)) {
                throw new UnauthorizedError()
            }

            await prisma.organization.update({
                where: {
                    id: organization.id
                },
                data: {
                    status: "DEACTIVATED"
                }
            })

            return reply.status(202).send()
        })
}
