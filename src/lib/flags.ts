/**
 * Development-only: show clearly labelled placeholders where real photos or
 * unconfirmed items are still missing. Production builds must leave this false.
 */
export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";
