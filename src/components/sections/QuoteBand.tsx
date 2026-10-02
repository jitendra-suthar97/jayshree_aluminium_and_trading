import { Section, type Tone } from "@/components/common/Section";
import { CallButton, WhatsAppButton } from "@/components/features/ContactButtons";
import { LazyQuoteForm } from "@/components/features/LazyQuoteForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/contact";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";
import type { Service } from "@/types";

/** The page's quote block (id="quote"). Conversion order: Call, WhatsApp, then the form. */
export function QuoteBand({
  tone = "grey",
  heading = "Planning a door, window, partition or mirror?",
  lead = "Tell us what you need. Call us, message us on WhatsApp or send the form.",
  service,
}: {
  tone?: Tone;
  heading?: string;
  lead?: string;
  service?: Service;
}) {
  const formEnabled = Boolean(site.form.accessKey) || SHOW_PLACEHOLDERS;
  const waMessage = service ? whatsappMessages.service(service.name) : whatsappMessages.siteMeasurement;

  return (
    <Section id="quote" tone={tone} labelledBy="quote-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={formEnabled ? "lg:col-span-5" : "lg:col-span-8"}>
          <h2 id="quote-heading" className="text-h2 font-semibold">
            {heading}
          </h2>
          <p className="mt-3 max-w-[46ch] text-body-lg text-ink">{lead}</p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <CallButton placement="quote-band" />
            <WhatsAppButton placement="quote-band" message={waMessage} />
          </div>
        </div>
        {formEnabled ? (
          <div className="lg:col-span-7">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-h4">Send us your details</CardTitle>
              </CardHeader>
              <CardContent>
                <LazyQuoteForm variant="compact" defaultService={service?.slug} placement="quote-band" />
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
