import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/variables" as *;`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://dummyjson.com/:path*',
      },
    ];
  },
};

export default nextConfig;
