import { Button } from "@/components/ui/button";
import { auth } from "@/hooks/is-authenticated";

export default async function Home() {
  const { user } = await auth()
  return (
    <pre>
      {JSON.stringify(user)}
    </pre>
  );
}
