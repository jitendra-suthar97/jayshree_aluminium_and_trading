import Link from "next/link";
import { Section } from "@/components/common/Section";
import { ButtonLink } from "@/components/common/ButtonLink";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { services } from "@/data/services";
import { whatsappMessages } from "@/lib/contact";

export default function NotFound() {
  return (
    <Section>
      <div className="max-w-[60ch]">
        <h1 className="text-h1 font-bold">Page not found</h1>
        <p className="mt-4 text-body-lg text-ink">
          This page does not exist or has moved. Use the links below, or call us.
        </p>
        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <CallButton placement="404" />
          <WhatsAppButton placement="404" message={whatsappMessages.general} />
          <ButtonLink href="/" variant="outline" size="lg">
            Go to home
          </ButtonLink>
        </div>
        <ul className="mt-8 grid gap-1">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}/`}
                className="inline-flex min-h-12 items-center text-base font-semibold text-blue-600 underline underline-offset-[3px]"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
