/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.us.archive.org'
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org'
      },

      {
        protocol: 'https',
        hostname: 'static.yakaboo.ua'
      },
      {
        protocol: 'http',
        hostname: 'books.google.com'
      }
    ]
  }
};

export default nextConfig;
