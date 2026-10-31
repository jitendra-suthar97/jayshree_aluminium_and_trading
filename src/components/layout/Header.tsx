"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { ButtonLink } from "@/components/common/ButtonLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./MobileNav";
import { primaryNav } from "@/data/nav";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navItem = (active: boolean) =>
  cn(
    "relative flex h-full items-center px-3 text-[15px] text-foreground transition-colors duration-150 hover:text-primary data-[state=open]:text-primary",
    active
      ? "font-semibold after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-brand-orange"
      : "font-medium",
  );

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [pathname]);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <Container wide className="flex h-[68px] items-center justify-between md:h-[76px]">
        <Link href="/" aria-label={`${site.name}, home`} className="inline-flex rounded-sm">
          <Logo className="h-9 md:h-11 lg:h-12" />
        </Link>

        <NavigationMenu aria-label="Primary" className="hidden lg:flex">
          <NavigationMenuList>
            {primaryNav.map((item) =>
              "hasChildren" in item && item.hasChildren ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger className={navItem(isActive(item.href))}>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="min-w-64 p-2">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <NavigationMenuLink asChild>
                            <Link href={`/services/${s.slug}/`} className="flex min-h-11 items-center px-3 text-sm text-foreground hover:bg-muted">
                              {s.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line pt-1">
                        <NavigationMenuLink asChild>
                          <Link href="/services/" className="flex min-h-11 items-center px-3 text-sm font-semibold text-primary hover:bg-muted">
                            All services
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={isActive(item.href)}>
                    <Link href={item.href} className={navItem(isActive(item.href))}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact/#quote" size="sm" className="hidden lg:inline-flex">
            Start a project
          </ButtonLink>
          <MobileNav open={menuOpen} onOpenChange={setMenuOpen} pathname={pathname} />
        </div>
      </Container>
    </header>
  );
}
