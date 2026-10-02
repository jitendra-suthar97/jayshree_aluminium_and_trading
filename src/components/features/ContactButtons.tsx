import { MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/common/ButtonLink";
import { primaryPhone, telHref, whatsappHref, whatsappVisible } from "@/lib/contact";
import { site } from "@/data/site";

type Size = "default" | "sm" | "lg";

/** Dials the primary number. One tap on mobile. */
export function CallButton({
  placement,
  size = "lg",
  variant = "default",
  label = "Call now",
  fullWidth,
  className,
}: {
  placement: string;
  size?: Size;
  variant?: "default" | "outline" | "inverse";
  label?: string;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <ButtonLink
      href={telHref(primaryPhone.e164)}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      icon={<Phone size={20} aria-hidden />}
      track={{ event: "call_click", placement }}
      aria-label={`${label}: ${site.name} on ${primaryPhone.display}`}
    >
      {label}
    </ButtonLink>
  );
}

/**
 * Opens WhatsApp with a prefilled message. Renders nothing until the WhatsApp number is
 * confirmed in data/site.ts (or in dev placeholder mode).
 * TODO: swap the generic chat icon for the official WhatsApp glyph from Meta's brand resources.
 */
export function WhatsAppButton({
  placement,
  message,
  size = "lg",
  variant = "whatsapp",
  label = "WhatsApp",
  fullWidth,
  className,
}: {
  placement: string;
  message: string;
  size?: Size;
  variant?: "whatsapp" | "inverse";
  label?: string;
  fullWidth?: boolean;
  className?: string;
}) {
  if (!whatsappVisible) return null;
  return (
    <ButtonLink
      href={whatsappHref(message)}
      external
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      icon={<MessageCircle size={20} aria-hidden />}
      track={{ event: "whatsapp_click", placement }}
    >
      {label}
    </ButtonLink>
  );
}
