import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/colors" as *;`,
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
