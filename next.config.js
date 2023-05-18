/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "play-lh.googleusercontent.com",
      "upload.wikimedia.org",
      "res.cloudinary.com",
      "cdn.pixabay.com",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
