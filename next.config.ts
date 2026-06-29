import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'akfagroup.com',
      },
    ],
  },
};

export default nextConfig;
