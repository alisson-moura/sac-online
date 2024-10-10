import { api } from "./api-client"

export async function removeMember({ slug, memberId }: { slug: string, memberId: string }): Promise<void> {
    await api.delete(`organizations/${slug}/members/${memberId}`)
}
