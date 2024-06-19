import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { ConflictRequestError } from "@/http/errors/conflict-request";
import { userSchema, organizationSchema, defineAbilityFor } from '@sac/authorization'
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function updateOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .put('/organizations/:slug', {
            schema: {
                tags: ['Organizations'],
                summary: 'Create a new organization',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                body: z.object({
                    name: z.string(),
                    domain: z.string().nullish(),
                    shouldAttachUsersByDomain: z.boolean().optional()
                }),
                response: {
                    201: z.object({
                        organizationId: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { name, domain, shouldAttachUsersByDomain } = request.body

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

            if (domain) {
                const organizationByDomain = await prisma.organization.findFirst({
                    where: {
                        domain,
                        slug: {
                            not: slug
                        }
                    }
                })
                if (organizationByDomain)
                    throw new ConflictRequestError('Another organization with same domain already exists.')
            }

            await prisma.organization.update({
                where: {
                    id: organization.id
                },
                data: {
                    name,
                    shouldAttachUsersByDomain,
                    domain,
                }
            })

            return reply.status(204).send({
                organizationId: organization.id
            })
        })
}
