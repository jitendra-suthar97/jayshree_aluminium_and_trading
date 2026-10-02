import { CallButton, WhatsAppButton } from "./ContactButtons";
import { whatsappMessages, whatsappVisible } from "@/lib/contact";
import { SHOW_PLACEHOLDERS } from "@/lib/flags";

/** Shown instead of the form when no form endpoint key is configured, so a lead can never be silently lost. */
export function QuoteFormFallback({ placement }: { placement: string }) {
  return (
    <div>
      <p className="text-body">
        To request a quote or a site measurement, call us{whatsappVisible ? " or message us on WhatsApp" : ""}.
      </p>
      <div className="mt-4 grid gap-3">
        <CallButton placement={`${placement}-fallback`} fullWidth />
        <WhatsAppButton placement={`${placement}-fallback`} message={whatsappMessages.siteMeasurement} fullWidth />
      </div>
      {SHOW_PLACEHOLDERS ? (
        <p className="mt-4 border-l-4 border-input pl-3 text-small text-muted-foreground">
          Dev note: the quote form is not configured. Set NEXT_PUBLIC_WEB3FORMS_KEY to enable it.
        </p>
      ) : null}
    </div>
  );
}
