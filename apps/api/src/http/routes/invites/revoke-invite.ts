import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function revokeInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .delete('/organizations/:slug/invites/:inviteId', {
            schema: {
                tags: ['Invites'],
                summary: 'Revoke a new invite',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                    inviteId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { slug, inviteId } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('delete', 'InviteSubject')) throw new UnauthorizedError()

            await prisma.invite.delete({
                where: {
                    id: inviteId,
                    organizationId: organization.id
                }
            })

            return reply.status(204).send()
        })
}