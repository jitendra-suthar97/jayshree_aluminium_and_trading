import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Section } from "@/components/common/Section";
import { primaryPhone } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Privacy | JAYSHREE Aluminium & Trading",
  description: "How this website handles information you send to JAYSHREE Aluminium & Trading.",
  path: "/privacy/",
});

/*
 * Basic notice, written only from what this site actually does (it adapts to the configured features).
 * TODO before launch: have the wording reviewed, and add a business email address once one exists.
 */
export default function PrivacyPage() {
  const formOn = Boolean(site.form.accessKey);
  const analyticsOn = Boolean(site.analytics.gaId);
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Privacy" }]} />
      <div className="mt-4 max-w-[68ch]">
        <h1 className="text-h1 font-bold">Privacy</h1>
        <div className="mt-6 grid gap-5 text-body text-ink">
          <p>This page explains what information this website handles. {site.name} runs this website.</p>

          {formOn ? (
            <p>
              <strong>Quote form.</strong> If you send the quote form, we receive the details you type: your name,
              mobile number, the service you want and, if you add them, your town and message. We use them to respond
              to your enquiry. The form is delivered by an email form service (Web3Forms), which processes the
              submission on our behalf.
            </p>
          ) : null}

          <p>
            <strong>Calls and WhatsApp.</strong> If you call us or message us on WhatsApp, that happens through your
            phone and WhatsApp, not through this website. Their own privacy terms apply.
          </p>

          {analyticsOn ? (
            <p>
              <strong>Analytics.</strong> This website uses Google Analytics to count visits and clicks on the call,
              WhatsApp and quote buttons. It does not receive what you type in the quote form.
            </p>
          ) : (
            <p>
              <strong>Analytics.</strong> This website does not currently use analytics or advertising trackers.
            </p>
          )}

          <p>
            <strong>Questions.</strong> To ask about your information, call us on {primaryPhone.display}.
          </p>
        </div>
      </div>
    </Section>
  );
}
