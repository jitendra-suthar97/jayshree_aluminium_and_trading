"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/common/ButtonLink";
import { primaryPhone, telHref, whatsappHref, whatsappMessages, whatsappVisible } from "@/lib/contact";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const segment = "h-14 rounded-none text-[15px]";

/**
 * Mobile only (below md). Order: Call, WhatsApp, Quote.
 * Hidden while a field has focus (keyboard open) via Tailwind group-has variants on <body class="group/page">.
 */
export function StickyContactBar() {
  const pathname = usePathname();
  const showQuote = !pathname.startsWith("/contact");
  const count = 1 + (whatsappVisible ? 1 : 0) + (showQuote ? 1 : 0);
  const cols = count === 3 ? "grid-cols-3" : count === 2 ? "grid-cols-2" : "grid-cols-1";

  // If this page has its own quote block, scroll to it; otherwise go to the Contact page form.
  const onQuote = (e: MouseEvent<HTMLElement>) => {
    const el = document.getElementById("quote");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ block: "start" });
    }
  };

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] group-has-[input:focus]/page:hidden group-has-[textarea:focus]/page:hidden group-has-[select:focus]/page:hidden md:hidden"
    >
      <div className={cn("grid", cols)}>
        <ButtonLink
          href={telHref(primaryPhone.e164)}
          className={segment}
          icon={<Phone size={20} aria-hidden />}
          track={{ event: "call_click", placement: "sticky" }}
          aria-label={`Call ${site.name} on ${primaryPhone.display}`}
        >
          Call
        </ButtonLink>
        {whatsappVisible ? (
          <ButtonLink
            href={whatsappHref(whatsappMessages.general)}
            external
            variant="whatsapp"
            className={segment}
            icon={<MessageCircle size={20} aria-hidden />}
            track={{ event: "whatsapp_click", placement: "sticky" }}
          >
            WhatsApp
          </ButtonLink>
        ) : null}
        {showQuote ? (
          <ButtonLink
            href="/contact/#quote"
            variant="ghost"
            className={segment}
            onClick={onQuote}
            track={{ event: "quote_click", placement: "sticky" }}
          >
            Quote
          </ButtonLink>
        ) : null}
      </div>
    </nav>
  );
}
