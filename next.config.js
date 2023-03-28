/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PUBLIC_SANITY_TOKEN: process.env.PUBLIC_SANITY_TOKEN,
    PUBLIC_GOOGLE_TOKEN: process.env.PUBLIC_GOOGLE_TOKEN,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["media.istockphoto.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
