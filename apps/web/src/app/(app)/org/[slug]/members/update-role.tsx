'use client'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getCurrentOrg } from "@/hooks/is-authenticated";
import { updateMemberRole } from "@/http/update-member-role";
import { Role } from "@sac/authorization";
import { ComponentProps } from "react";
import { updateMemberRoleAction } from "./actions";

interface UpdateProps extends ComponentProps<typeof Select> {
    memberId: string
}

export function UpdateRoleSelect({ memberId, ...props }: UpdateProps) {
    async function handleUpdateMemberRole(role: Role) {
       await updateMemberRoleAction(memberId, role)
    }

    return(
        <Select onValueChange={handleUpdateMemberRole} {...props}>
            <SelectTrigger className="w-32 h-8">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Gestor">Gestor</SelectItem>
                <SelectItem value="Assistente">Assistente</SelectItem>
            </SelectContent>
        </Select>
    )
}