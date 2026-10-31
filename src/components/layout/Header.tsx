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

// Active item: bold + 3px orange bar on the header's bottom edge (never colour alone)
const navItem = (active: boolean) =>
  cn(
    "relative flex h-full items-center px-4 text-base text-foreground transition-colors duration-150 hover:text-primary data-[state=open]:text-primary",
    active
      ? "font-semibold after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:bg-brand-orange"
      : "font-medium",
  );

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu after any navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container
        wide
        className="flex h-14 items-center justify-between md:h-16 lg:h-18"
      >
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="inline-flex rounded-md"
        >
          <Logo className="h-10 md:h-12 lg:h-13" />
        </Link>

        {/* Desktop navigation (shadcn NavigationMenu) */}
        <NavigationMenu aria-label="Primary" className="hidden lg:flex">
          <NavigationMenuList>
            {primaryNav.map((item) =>
              "hasChildren" in item && item.hasChildren ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={navItem(isActive(item.href))}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/services/${s.slug}/`}
                              className="flex h-11 items-center px-4 text-base text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              {s.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-border pt-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/"
                            className="flex h-11 items-center px-4 text-base font-semibold text-primary hover:bg-accent"
                          >
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
                    <Link
                      href={item.href}
                      className={navItem(isActive(item.href))}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact/#quote"
            size="sm"
            className="hidden lg:inline-flex"
          >
            Request Quote
          </ButtonLink>
          {/* Tablet and mobile: Call button + menu sheet */}
          <MobileNav
            open={menuOpen}
            onOpenChange={setMenuOpen}
            pathname={pathname}
          />
        </div>
      </Container>
    </header>
  );
}
