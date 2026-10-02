"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { CallButton, WhatsAppButton } from "./ContactButtons";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { primaryPhone, whatsappMessages, whatsappVisible } from "@/lib/contact";

const ENDPOINT = "https://api.web3forms.com/submit";
const TIMEOUT_MS = 10_000;

/** Accepts 10-digit Indian mobiles, with or without +91 / 0 prefix and spaces. */
function normalisePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

interface Values {
  name: string;
  phone: string;
  service: string;
  town: string;
  message: string;
  botcheck: string;
}

const optional = <span className="font-normal text-muted-foreground"> (optional)</span>;
const required = <span className="font-normal text-muted-foreground"> (required)</span>;

export function QuoteForm({
  variant = "full",
  defaultService = "",
  placement = "form",
}: {
  variant?: "compact" | "full";
  defaultService?: string;
  placement?: string;
}) {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  const form = useForm<Values>({
    defaultValues: { name: "", phone: "", service: defaultService, town: "", message: "", botcheck: "" },
    reValidateMode: "onBlur",
  });
  const submitting = form.formState.isSubmitting;

  async function onSubmit(values: Values) {
    if (values.botcheck) return; // honeypot: silently ignore bots
    setFailed(false);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const serviceLabel = services.find((s) => s.slug === values.service)?.name ?? "Not sure yet";
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: site.form.accessKey,
          subject: `New enquiry: ${serviceLabel}`,
          from_name: `${site.shortName} website`,
          name: values.name.trim(),
          phone: normalisePhone(values.phone),
          service: serviceLabel,
          town: values.town.trim(),
          message: values.message.trim(),
        }),
      });
      const json: { success?: boolean } = await res.json();
      if (!res.ok || !json.success) throw new Error("Form provider rejected the submission");
      window.gtag?.("event", "form_submit", { placement });
      router.push("/thank-you/");
    } catch {
      setFailed(true);
    } finally {
      clearTimeout(timer);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5">
        {/* Honeypot: hidden from people and assistive tech */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...form.register("botcheck")}
        />

        <FormField
          control={form.control}
          name="name"
          rules={{ validate: (v) => v.trim().length >= 2 || "Enter your name." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name{required}</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          rules={{ validate: (v) => /^[6-9]\d{9}$/.test(normalisePhone(v)) || "Enter a 10-digit mobile number." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number{required}</FormLabel>
              <FormControl>
                <Input type="tel" inputMode="tel" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          rules={{ required: "Choose what you need." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>What do you need?{required}</FormLabel>
              <FormControl>
                <NativeSelect {...field}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {variant === "full" ? (
          <>
            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where is the site?{optional}</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="address-level2" {...field} />
                  </FormControl>
                  <FormDescription>Town or area.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message{optional}</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormDescription>Sizes, the type of work and anything else you want us to know.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : null}

        {failed ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden />
            <AlertTitle>We could not send your enquiry.</AlertTitle>
            <AlertDescription>
              Your details are still in the form. Please try again, or call {primaryPhone.display}
              {whatsappVisible ? " or message us on WhatsApp" : ""}.
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <CallButton placement={`${placement}-error`} size="default" />
                <WhatsAppButton placement={`${placement}-error`} message={whatsappMessages.siteMeasurement} size="default" />
              </div>
            </AlertDescription>
          </Alert>
        ) : null}

        <div>
          <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting} className="w-full md:w-auto">
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={20} aria-hidden />
                Sending…
              </>
            ) : (
              "Request quote"
            )}
          </Button>
          <p className="mt-3 text-small text-muted-foreground">
            By sending this form you agree that we may call or message you about your enquiry.{" "}
            <Link href="/privacy/" className="underline underline-offset-[3px] hover:text-primary">
              Privacy
            </Link>
            {whatsappVisible ? ". Prefer to send photos? Use WhatsApp." : "."}
          </p>
        </div>
      </form>
    </Form>
  );
}
