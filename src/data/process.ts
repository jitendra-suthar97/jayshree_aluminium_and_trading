import type { ProcessStep } from "@/types";

/**
 * Only steps drawn from the services the business listed.
 * Not included until confirmed: quotation/design step, payment terms, timelines, warranty, after-sales.
 */
export const processSteps: ProcessStep[] = [
  { title: "Enquiry", detail: "Call us, message on WhatsApp or send the quote form." },
  { title: "Site measurement", detail: "We measure the opening or space at your site." },
  { title: "Fabrication", detail: "The aluminium and glass work is fabricated to your measurement." },
  { title: "Glass fitting and hardware", detail: "Glass is fitted and hardware is installed." },
  { title: "Site installation", detail: "The finished work is installed at your site." },
];
