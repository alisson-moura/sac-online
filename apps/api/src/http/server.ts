import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { createAccount } from './routes/auth/create-account'
import { authWithPassword } from './routes/auth/auth-with-password'
import fastifyJwt from '@fastify/jwt'
import { getProfile } from './routes/auth/get-profile'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors)
app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? ''
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
        ]
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});


app.register(createAccount)
app.register(authWithPassword)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running')
})