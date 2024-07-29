import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function removeMember(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .delete('/organizations/:slug/members/:memberId', {
            schema: {
                tags: ['Members'],
                summary: 'Remove a member from the organization',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                    memberId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { slug, memberId } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('manage', 'UserSubject')) throw new UnauthorizedError()

            await prisma.member.delete({
                where: {
                    id: memberId,
                    organizationId: organization.id
                }
            })

            return reply.status(204).send()
        })
}