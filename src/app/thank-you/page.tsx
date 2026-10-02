import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/common/Section";
import { ButtonLink } from "@/components/common/ButtonLink";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { whatsappMessages } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Thank you | JAYSHREE Aluminium & Trading",
  description: "Your enquiry has been sent.",
  path: "/thank-you/",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <Section>
      <div className="max-w-[60ch]">
        <h1 className="text-h1 font-bold">Thank you</h1>
        <p className="mt-4 text-body-lg text-ink">Your enquiry has been sent. If it is urgent, you can also call us now.</p>
        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <CallButton placement="thank-you" />
          <WhatsAppButton placement="thank-you" message={whatsappMessages.general} />
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
