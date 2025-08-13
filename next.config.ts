import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stage73.q2.cz',
        port: '',
        pathname: '/q2onboarding/www/img/**',
      },
    ],
  },
};

export default nextConfig;
