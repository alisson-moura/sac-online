import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";
import { rolesSchema } from "@sac/authorization";
import { BadRequestError } from "@/http/errors/bad-request";

export async function createInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .post('/organizations/:slug/invites', {
            schema: {
                tags: ['Invites'],
                summary: 'Create a new invite',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                body: z.object({
                    email: z.string().email(),
                    role: rolesSchema,
                }),
                response: {
                    201: z.object({
                        inviteId: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { email, role } = request.body
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('create', 'InviteSubject')) throw new UnauthorizedError()

            const inviteWithSameEmail = await prisma.invite.findUnique({
                where: {
                    email_organizationId: {
                        email,
                        organizationId: organization.id
                    }
                }
            })
            if (inviteWithSameEmail) {
                throw new BadRequestError('Another invite with same e-mail already exists.')
            }
            const invite = await prisma.invite.create({
                data: {
                    email,
                    role,
                    authorId: membership.userId,
                    organizationId: organization.id
                }
            })

            return reply.status(201).send({
                inviteId: invite.id
            })
        })
}