import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { createAccount } from './routes/auth/create-account'
import { authWithPassword } from './routes/auth/auth-with-password'
import fastifyJwt from '@fastify/jwt'
import { getProfile } from './routes/auth/get-profile'
import { errorHandler } from './errors/error-handler'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
import { env } from '@sac/env'
import { createOrganization } from './routes/organizations/create-organization'
import { getMembership } from './routes/organizations/get-membership'
import { getOrganization } from './routes/organizations/get-organization'
import { getOrganizations } from './routes/organizations/get-organizations'
import { updateOrganization } from './routes/organizations/update-organization'
import { shutdownOrganization } from './routes/organizations/shutdown-organization'
import { transferOrganization } from './routes/organizations/transfer-organization'
import { createForm } from './routes/forms/create-form'
import { inactivateForm } from './routes/forms/inactivate-form'
import { getForm } from './routes/forms/get-form'
import { getForms } from './routes/forms/get-forms'
import { updateForm } from './routes/forms/update-form'
import { getMembers } from './routes/members/get-members'
import { updateMember } from './routes/members/update-member'
import { removeMember } from './routes/members/remove-member'
import { createInvite } from './routes/invites/create-invite'
import { getInvite } from './routes/invites/get-invite'
import { getInvites } from './routes/invites/get-invites'
import { acceptInvite } from './routes/invites/accept-invite'
import { rejectInvite } from './routes/invites/reject-invite'
import { revokeInvite } from './routes/invites/revoke-invite'
import { getPendingInvites } from './routes/invites/get-pending-invites'

const app = fastify({
    logger: {
        level: 'debug'
    }
}).withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors)
app.setErrorHandler(errorHandler)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(fastifySwagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Sac Online API',
            description: 'SAC Online é um sistema SaaS multi-tenant para gestão de atendimento ao cliente, oferecendo ferramentas para criar e gerenciar organizações, membros, formulários de satisfação e incidentes.',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3333',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

app.register(createAccount)
app.register(authWithPassword)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(getProfile)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(createForm)
app.register(inactivateForm)
app.register(getForm)
app.register(getForms)
app.register(updateForm)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.register(createInvite)
app.register(getInvite)
app.register(getInvites)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvites)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running')
})