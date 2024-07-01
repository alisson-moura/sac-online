import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "@/http/errors/unauthorized";
import { NotFoundError } from "@/http/errors/not-found";

export async function updateForm(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .put('/organizations/:slug/forms/:id', {
            schema: {
                tags: ['Survey Forms'],
                summary: 'Update an survey form',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                    id: z.string()
                }),
                body: z.object({
                    title: z.string().max(140).min(6),
                    description: z.string().min(6).max(340),
                }),
                response: {
                    204: z.null()
                }
            }
        }, async (request, reply) => {
            const { slug, id } = request.params
            const { title, description } = request.body
            const { membership, organization } = await request.getUserMembership(slug)
            const { cannot } = getUserPermissions(membership)

            if (cannot('manage', 'FormSubject')) throw new UnauthorizedError()

            const form = await prisma.forms.findFirst({
                where: {
                    id,
                    organization: {
                        slug
                    }
                }
            })
            if (form == null) throw new NotFoundError()

            await prisma.forms.update({
                data: {
                    name: title,
                    description
                },
                where: {
                    id
                }
            })

            return reply.status(204).send()
        })
}