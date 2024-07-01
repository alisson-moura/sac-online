import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";

export async function createForm(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .post('/organizations/:slug/forms', {
            schema: {
                tags: ['Survey Forms'],
                summary: 'Create a new survey form',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                body: z.object({
                    title: z.string().max(140).min(6),
                    description: z.string().min(6).max(340),
                }),
                response: {
                    201: z.object({
                        formId: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { title, description } = request.body
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if(cannot('manage', 'FormSubject')) throw new UnauthorizedError()
            
            const form = await prisma.forms.create({
                data: {
                    description,
                    name: title,
                    organizationId: organization.id,
                }
            })

            return reply.status(201).send({
                formId: form.id
            })
        })
}