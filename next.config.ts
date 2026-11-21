import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export served by Cloudflare Workers static assets (wrangler.jsonc).
  // Response headers live in public/_headers.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
