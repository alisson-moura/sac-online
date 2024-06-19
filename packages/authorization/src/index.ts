import {
    createMongoAbility,
    CreateAbility,
    MongoAbility,
    AbilityBuilder,
} from '@casl/ability';
import { User } from './models/user';
import { permissions } from './permissions'
import { userSubject, UserSubject } from './subjects/user';
import { formSubject, FormSubject } from './subjects/form';
import { organizationSubject, OrganizationSubject } from './subjects/organization';
import { inviteSubject, InviteSubject } from './subjects/invite';
import { z } from 'zod';

export * from './models/form'
export * from './models/invite'
export * from './models/organization'
export * from './models/user'



const appAbilitiesSchema = z.union([
    userSubject,
    formSubject,
    organizationSubject,
    inviteSubject,
    z.tuple([z.literal('manage'), z.literal('all')])
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User): AppAbility {
    const builder = new AbilityBuilder(createAppAbility)

    if (typeof permissions[user.role] != 'function')
        throw new Error(`Permissions for role ${user.role} not found.`)

    permissions[user.role](user, builder)
    const ability = builder.build({
        detectSubjectType(subject) {
            return subject.__typename
        }
    })

    ability.can = ability.can.bind(ability)
    ability.cannot = ability.cannot.bind(ability)
    
    return ability
}