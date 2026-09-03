import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'zwrynadzetgpphjkhhzx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    // Cache optimized images for 31 days so each variant is transformed
    // roughly once a month — keeps Vercel transformation count near zero
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
