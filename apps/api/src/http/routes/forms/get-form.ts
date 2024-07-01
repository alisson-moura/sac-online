import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";
import { NotFoundError } from "@/http/errors/not-found";
import { formSchema } from "@sac/authorization";

export async function getForm(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/organizations/:slug/forms/:id', {
            schema: {
                tags: ['Survey Forms'],
                summary: 'Show Form',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    id: z.string(),
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        id: z.string(),
                        title: z.string(),
                        description: z.string(),
                        status: z.string(),
                        organization: z.object({
                            id: z.string(),
                            name: z.string()
                        })
                    })
                }
            }
        }, async (request, reply) => {
            const { id, slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)
            
            if (cannot('view', formSchema.parse({
                id,
                organizationId: organization.id
            }))) throw new UnauthorizedError()

            const form = await prisma.forms.findUnique({
                where: { id, organizationId: organization.id },
                include: {
                    organization: true
                }
            })
            if (form == null) throw new NotFoundError()

            return reply.status(200).send({
                id: form.id,
                title: form.name,
                description: form.description,
                status: form.status,
                organization: {
                    id: form.organization.id,
                    name: form.organization.name
                }
            })
        })
}