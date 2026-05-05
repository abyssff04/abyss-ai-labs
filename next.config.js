/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15: React 19 is the default — no extra flag needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Silence noisy fetch logs in development
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

module.exports = nextConfig;
