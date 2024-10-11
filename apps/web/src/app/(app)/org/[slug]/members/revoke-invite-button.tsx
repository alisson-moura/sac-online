import { Button } from "@/components/ui/button";
import { XOctagon } from "lucide-react";
import { revokeInviteAction } from "./actions";

export function RevokeInviteButton({ inviteId }: { inviteId: string }) {
    return (
        <form action={revokeInviteAction.bind(null, inviteId)}>
            <Button size='sm' variant='destructive'>
                <XOctagon className="size-4 mr-2" />
                Revogar
            </Button>
        </form>
    )
}