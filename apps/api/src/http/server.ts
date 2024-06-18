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

const app = fastify().withTypeProvider<ZodTypeProvider>()
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

app.listen({ port: env.SERVER_PORT }).then(() => {
    console.log('HTTP server running')
})