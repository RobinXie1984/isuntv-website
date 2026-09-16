import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  // Catalogue metadata is local and immediate. Keep it in the initial head so
  // crawlers and other HTML readers do not need JavaScript to discover it.
  ...(process.env.ISUN_STATIC_EXPORT === '1' ? { output: 'export' as const, trailingSlash: true } : {}),
  htmlLimitedBots: /.*/,
};

export default nextConfig;
