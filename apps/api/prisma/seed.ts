import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function seed() {
    const passwordHash = await hash('123456', 1)

    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john@acme.com',
            avatarUrl: 'https://github.com/diego3g.png',
            passwordHash,
        },
    })

    const anotherUser = await prisma.user.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatarGitHub(),
            passwordHash,
        },
    })

    const anotherUser2 = await prisma.user.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatarGitHub(),
            passwordHash,
        },
    })

    await prisma.organization.create({
        data: {
            name: 'Acme Inc (GESTOR)',
            domain: 'acme.com',
            slug: 'acme-gestor',
            avatarUrl: faker.image.avatarGitHub(),
            shouldAttachUsersByDomain: true,
            ownerId: user.id,
            forms: {
                createMany: {
                    data: [
                        {
                            name: faker.lorem.words(5),
                            description: faker.lorem.paragraph(),
                        },
                        {
                            name: faker.lorem.words(5),
                            description: faker.lorem.paragraph(),
                        },
                        {
                            name: faker.lorem.words(5),
                            description: faker.lorem.paragraph(),
                        },
                    ],
                },
            },
            members: {
                createMany: {
                    data: [
                        {
                            userId: user.id,
                            role: 'GESTOR',
                        },
                        {
                            userId: anotherUser.id,
                            role: 'ASSISTENTE',
                        },
                        {
                            userId: anotherUser2.id,
                            role: 'ASSISTENTE',
                        },
                    ],
                },
            },
        },
    })

    await prisma.organization.create({
        data: {
            name: 'Acme Inc (ASSISTENTE)',
            slug: 'acme-assistente',
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: anotherUser.id,
            forms: {
                createMany: {
                    data: [
                        {
                            name: faker.lorem.words(5),
                            description: faker.lorem.paragraph(),
                        },
                        {
                            name: faker.lorem.words(5),
                            description: faker.lorem.paragraph(),
                        },
                        {
                            name: faker.lorem.words(5),
                            description: faker.lorem.paragraph(),
                        },
                    ],
                },
            },
            members: {
                createMany: {
                    data: [
                        {
                            userId: user.id,
                            role: 'ASSISTENTE',
                        },
                        {
                            userId: anotherUser.id,
                            role: 'GESTOR',
                        },
                        {
                            userId: anotherUser2.id,
                            role: 'ASSISTENTE',
                        },
                    ],
                },
            },
        },
    })
}

seed().then(() => console.log('Database seeded'))