import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getProfile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/profile', {
        schema: {
            tags: ['Auth'],
            summary: 'Get authenticated user profile',
            response: {
                200: z.object({
                    user: z.object({
                        id: z.string().uuid(),
                        name: z.string().nullable(),
                        email: z.string().email(),
                        avatarUrl: z.string().url().nullable()
                    })
                }),
                400: z.object({
                    error: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                avatarUrl: true,
                email: true,
                name: true
            },
            where: {
                id: sub
            }
        })
        if (user == null)
            return reply.status(400).send({ error: 'Invalid token.' })


        return reply.status(200).send({
            user
        })
    })
}