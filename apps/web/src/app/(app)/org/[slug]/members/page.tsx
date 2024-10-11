import { ability } from "@/hooks/is-authenticated";
import Invites from "./invites";
import List from "./list";

export default async function Members() {
    const permissions = await ability()

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {permissions?.can('get', 'InviteSubject') && (
                    <Invites />
                )}
                {permissions?.can('view', 'UserSubject') && (
                    <List />
                )}
            </div>
        </div>
    )
}