import {
    createMongoAbility,
    CreateAbility,
    MongoAbility,
    AbilityBuilder,
} from '@casl/ability';
import { User } from './models/user';
import { permissions } from './permissions'
import { UserSubject } from './subjects/user';
import { FormSubject } from './subjects/form';
import { OrganizationSubject } from './subjects/organization';
import { InviteSubject } from './subjects/invite';

export * from './models/form'
export * from './models/invite'
export * from './models/organization'
export * from './models/user'


type AppAbilities = UserSubject | FormSubject | OrganizationSubject | InviteSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User): AppAbility {
    const builder = new AbilityBuilder(createAppAbility)

    if (typeof permissions[user.role] == undefined)
        throw new Error(`Permissions for role ${user.role} not found.`)

    permissions[user.role](user, builder)
    const ability = builder.build({
        detectSubjectType(subject) {
            return subject.__typename
        }
    })
    return ability
}