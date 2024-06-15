import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { compare } from 'bcryptjs'

export async function authWithPassword(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/sessions/password', {
        schema: {
            tags: ['Auth'],
            summary: 'Authenticate with email and password',
            description: 'This endpoint allows a user to log in by providing their email and password. If the credentials are correct, it returns an authentication token.',
            body: z.object({
                email: z.string().email(),
                password: z.string().min(6)
            }),
            response: {
                200: z.object({
                    token: z.string()
                }),
                400: z.object({
                    error: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { email, password } = request.body
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user == null || user.passwordHash == null)
            return reply.status(400).send({ error: 'Invalid e-mail or password.' })


        const passwordMatch = await compare(password, user.passwordHash)
        if (!passwordMatch)
            return reply.status(400).send({ error: 'Invalid e-mail or password.' })

        const token = await reply.jwtSign({ sub: user.id }, {
            sign: {
                expiresIn: '7d'
            }
        })
        return reply.status(200).send({
            token
        })
    })
}