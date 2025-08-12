import { usePathname } from "next/navigation";

export function useIsAuthPage() {
  const pathname = usePathname();

  // Lista de rotas exatas ou que começam com...
  const authRoutes = ["/login", "/register"];

  return authRoutes.some((route) => pathname.startsWith(route));
}
