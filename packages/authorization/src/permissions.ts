import { AbilityBuilder } from "@casl/ability";
import { AppAbility } from ".";
import { User } from "./models/user";
import { Role } from "./roles";

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, PermissionsByRole> = {
    Admin: function (_user, builder: AbilityBuilder<AppAbility>): void {
        builder.can('manage', 'all')
    },
    Gestor: function (user, builder: AbilityBuilder<AppAbility>): void {
        builder.can('manage', 'OrganizationSubject', { id: { $eq: user.organizationId } })
        builder.can('manage', 'FormSubject', { organizationId: { $eq: user.organizationId } })
        builder.can('manage', 'UserSubject', { organizationId: { $eq: user.organizationId } })
        builder.can('create', 'InviteSubject', { organizationId: { $eq: user.organizationId } })
        builder.can('get', 'InviteSubject', { organizationId: { $eq: user.organizationId } })
        builder.can('delete', 'InviteSubject', { organizationId: { $eq: user.organizationId } })
    },
    Assistente: function (user, builder: AbilityBuilder<AppAbility>): void {
        builder.can('view', 'UserSubject', { organizationId: { $eq: user.organizationId } })
        builder.can('view', 'FormSubject', { organizationId: { $eq: user.organizationId } })
        builder.can('view', 'OrganizationSubject', { id: { $eq: user.organizationId } })
        builder.can('update', 'UserSubject', { id: { $eq: user.id } })
    },
    Cliente: function (_user, _builder: AbilityBuilder<AppAbility>): void {
        throw new Error("Function not implemented.");
    }
}