"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/common/ButtonLink";
import { Logo } from "@/components/common/Logo";
import { WhatsAppButton } from "@/components/features/ContactButtons";
import { primaryNav } from "@/data/nav";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { addressLine, primaryPhone, telHref, whatsappMessages } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const row =
  "relative flex min-h-14 items-center border-b border-border px-4 text-lg";
const rowActive =
  "font-semibold before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-brand-orange";

/** Mobile and tablet menu: shadcn Sheet (focus trap, Esc, scroll lock from Radix) + Accordion for Services. */
export function MobileNav({
  open,
  onOpenChange,
  pathname,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}) {
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onOpenChange(false);
      }
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center gap-2 lg:hidden">
        <ButtonLink
          href={telHref(primaryPhone.e164)}
          variant="outline"
          className="min-w-12 px-3"
          icon={<Phone size={20} aria-hidden />}
          track={{ event: "call_click", placement: "header" }}
          aria-label={`Call ${site.name} on ${primaryPhone.display}`}
        >
          <span className="hidden text-[15px] md:inline">Call</span>
        </ButtonLink>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu size={24} aria-hidden />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader className="h-14 shrink-0 justify-center border-b border-border px-4 md:h-16">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation and contact options
          </SheetDescription>
          <Logo className="h-12 w-30 pb-1" />
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1">
          <ul>
            {primaryNav.map((item) =>
              "hasChildren" in item && item.hasChildren ? (
                <li key={item.href}>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={
                      pathname.startsWith("/services") ? "services" : undefined
                    }
                  >
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger
                        className={cn(
                          isActive(item.href) && rowActive,
                          "relative border-b border-border",
                        )}
                      >
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="bg-muted">
                        <ul>
                          {services.map((s) => (
                            <li key={s.slug}>
                              <SheetClose asChild>
                                <Link
                                  href={`/services/${s.slug}/`}
                                  className="flex min-h-12 items-center border-b border-border px-8 text-base"
                                >
                                  {s.name}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                          <li>
                            <SheetClose asChild>
                              <Link
                                href="/services/"
                                className="flex min-h-12 items-center border-b border-border px-8 text-base font-semibold text-primary"
                              >
                                All services
                              </Link>
                            </SheetClose>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ) : (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        row,
                        isActive(item.href) ? rowActive : "font-medium",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="grid gap-3 border-t border-border p-4">
          <SheetClose asChild>
            <ButtonLink
              href={telHref(primaryPhone.e164)}
              size="lg"
              fullWidth
              icon={<Phone size={20} aria-hidden />}
              track={{ event: "call_click", placement: "drawer" }}
            >
              Call {primaryPhone.display}
            </ButtonLink>
          </SheetClose>
          <WhatsAppButton
            placement="drawer"
            message={whatsappMessages.general}
            fullWidth
          />
          <SheetClose asChild>
            <ButtonLink
              href="/contact/#quote"
              variant="outline"
              size="lg"
              fullWidth
            >
              Request Quote
            </ButtonLink>
          </SheetClose>
          <p className="pt-1 text-small text-muted-foreground">
            {site.name}, {addressLine}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
