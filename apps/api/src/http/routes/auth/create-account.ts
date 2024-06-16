import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { hash } from 'bcryptjs'
import { BadRequestError } from "@/http/errors/bad-request";

export async function createAccount(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/accounts', {
        schema: {
            tags: ['Auth'],
            summary: 'Create a new account',
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(6)
            }),
            response: {
                201: z.undefined()
            }
        }
    }, async (request, reply) => {
        const { name, email, password } = request.body
        const emailAlreadyInUse = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (emailAlreadyInUse)
            throw new BadRequestError('user with same e-mail already exists.')


        const [, domain] = email.split('@')
        const autoJoinOrganization = await prisma.organization.findFirst({
            where: {
                domain,
                shouldAttachUsersByDomain: true
            }
        })
        const passwordHash = await hash(password, 8)

        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                memberOn: autoJoinOrganization ? {
                    create: {
                        organizationId: autoJoinOrganization.id,
                    }
                } : undefined
            }
        })
        return reply.status(201).send()
    })
}