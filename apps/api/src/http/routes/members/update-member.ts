import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";
import { rolesSchema } from "@sac/authorization";

export async function updateMember(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .put('/organizations/:slug/members/:memberId', {
            schema: {
                tags: ['Members'],
                summary: 'Update a member',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                    memberId: z.string().uuid()
                }),
                body: z.object({
                    role: rolesSchema
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { slug, memberId } = request.params
            const { role } = request.body
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('manage', 'UserSubject')) throw new UnauthorizedError()

            await prisma.member.update({
                where: {
                    id: memberId,
                    organizationId: organization.id
                },
                data: {
                    role
                }
            })

            return reply.status(204).send()
        })
}