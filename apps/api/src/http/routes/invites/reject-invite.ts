import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { BadRequestError } from "@/http/errors/bad-request";
import { authMiddleware } from "@/http/middlewares/auth";

export async function rejectInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .post('/invites/:inviteId/reject', {
            schema: {
                tags: ['Invites'],
                security: [{ bearerAuth: [] }],
                summary: 'Reject an invite',
                params: z.object({
                    inviteId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const userId = await request.getCurrentUserId()
            const { inviteId } = request.params


            const invite = await prisma.invite.findUnique({
                where: {
                    id: inviteId
                }
            })
            if (invite == null) {
                throw new BadRequestError('Invite not found')
            }

            const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })
            if (user.email != invite.email) {
                throw new BadRequestError('This invite belongs to another user.')
            }

           await  prisma.invite.delete({
                where: {
                    id: invite.id
                }
            })
    
            return reply.status(204).send()
        })
}