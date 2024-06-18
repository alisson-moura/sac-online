import { authMiddleware } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/organizations/:slug', {
            schema: {
                tags: ['Organizations'],
                summary: 'Get details from organization',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                }),
                response: {
                    200: z.object({
                        organization: z.object({
                            id: z.string().uuid(),
                            name: z.string(),
                            slug: z.string(),
                            avatarUrl: z.string().nullable(),
                            domain: z.string().nullable(),
                            shouldAttachUsersByDomain: z.boolean()
                        })
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { organization } = await request.getUserMembership(slug)

            return reply.status(200).send({
                organization
            })
        })
}