import { authMiddleware } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getMembership(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(authMiddleware)
        .get('/organizations/:slug/membership', {
            schema: {
                tags: ['Organizations'],
                summary: 'Get user membership on organization',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                }),
                response: {
                    200: z.object({
                        membership: z.object({
                            id: z.string().uuid(),
                            organizationId: z.string().uuid(),
                            role: z.string(), 
                        })
                    })
                }
            }
        }, async (request, reply) => {
            const { slug } = request.params
            const { membership } = await request.getUserMembership(slug)

            return reply.status(200).send({
                membership: {
                    role: membership.role,
                    id: membership.id,
                    organizationId: membership.organizationId
                }
            })
        })
}