import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function getForms(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/organizations/:slug/forms', {
            schema: {
                tags: ['Survey Forms'],
                summary: 'Get all organization forms',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        forms: z.array(
                            z.object({
                                id: z.string(),
                                title: z.string(),
                                description: z.string(),
                                status: z.string(),
                            })
                        )
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('view', 'FormSubject')) throw new UnauthorizedError()

            const forms = await prisma.forms.findMany({
                where: { organizationId: organization.id },
            })

            return reply.status(200).send({
                forms: forms.map(form => ({
                    id: form.id,
                    title: form.name,
                    description: form.description,
                    status: form.status
                }))
            })
        })
}