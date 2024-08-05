import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { authMiddleware } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { ConflictRequestError } from "@/http/errors/conflict-request";
import { createSlug } from "@/utils/create-slug";



export async function createOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .post('/organizations', {
        schema: {
            tags: ['Organizations'],
            summary: 'Create a new organization',
            security: [{bearerAuth: []}],
            body: z.object({
                name: z.string(),
                domain: z.string().nullish(),
                shouldAttachUsersByDomain: z.boolean().optional()
            }),
            response: {
                201: z.object({
                    organizationId: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { name, domain, shouldAttachUsersByDomain } = request.body
        
        if(domain) {
            const organizationByDomain = await prisma.organization.findFirst({
                where: {
                    domain
                }
            })
            if(organizationByDomain)
                throw new ConflictRequestError('Another organization with same domain already exists.')
        }

        const organization = await prisma.organization.create({
            data: {
                name,
                slug: createSlug(name),
                ownerId: userId,
                shouldAttachUsersByDomain,
                domain: domain ?? null,
                members: {
                    create: {
                        userId,
                        role: 'Gestor'
                    }
                }
            }
        })

        return reply.status(201).send({
            organizationId: organization.id
        })
    })
}