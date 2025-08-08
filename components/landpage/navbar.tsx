import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Funcionalidades",
  },
  {
    href: "#pricing",
    label: "Preço",
  },
  {
    href: "#faq",
    label: "Perguntas frequentes",
  },
];

export const Navbar = () => {
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-start gap-12">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center text-primary"
            >
              <Image
                src={"/logo.png"}
                width={70}
                height={15}
                alt={"Logomarca do Sac-App"}
                priority
              />
              Sac App
            </Link>
          </NavigationMenuItem>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-sm ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4 ml-auto">
            <NavigationMenuItem>
              <Button asChild size="sm">
                <Link rel="noreferrer noopener" href="/login">
                  Entrar <ChevronRight />
                </Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild size="sm" variant="outline">
                <Link rel="noreferrer noopener" href="/register">
                  Começe agora
                </Link>
              </Button>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
