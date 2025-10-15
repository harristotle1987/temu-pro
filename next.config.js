/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use remotePatterns instead of deprecated `domains`.
    // Each pattern may include protocol, hostname, port, and pathname.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Server Actions are enabled by default in Next.js 14 — remove experimental.serverActions
}

module.exports = nextConfig