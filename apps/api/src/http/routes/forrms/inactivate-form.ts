import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";
import { NotFoundError } from "@/http/errors/not-found";
import { formSchema } from "@sac/authorization";

export async function inactivateForm(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .delete('organizations/:slug/forms/:id', {
            schema: {
                tags: ['Survey Forms'],
                summary: 'Inactivate Form',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    id: z.string(),
                    slug: z.string()
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { id, slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            const form = await prisma.forms.findUnique({
                where: { id, organizationId: organization.id }
            })
            if (form == null) throw new NotFoundError()

            if (cannot('manage', formSchema.parse({
                id,
                organizationId: organization.id
            }))) throw new UnauthorizedError()

            await prisma.forms.update({
                where: {
                    id
                },
                data: {
                    status: 'INACTIVE'
                }
            })
            return reply.status(204).send()
        })
}