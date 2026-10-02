import type { NextConfig } from "next";

// Default: static prerender (SSG) for Vercel, with Next's image optimizer.
// Cloudflare Pages / any static host: run with NEXT_OUTPUT=export (images are then served as-is,
// so compress them before adding them to /public/images).
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const } : {}),
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isExport ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
