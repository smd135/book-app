/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.us.archive.org'
      }
    ]
  }
};

export default nextConfig;
