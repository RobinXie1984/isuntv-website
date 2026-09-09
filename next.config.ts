import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Catalogue metadata is local and immediate. Keep it in the initial head so
  // crawlers and other HTML readers do not need JavaScript to discover it.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
