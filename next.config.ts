import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gremlini.store', 
        pathname: '/storage/**', 
      },
    ],
  },
};

export default nextConfig;
