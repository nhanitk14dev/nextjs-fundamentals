/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts'],
  eslint: {
    dirs: ['page']
  }
}

module.exports = nextConfig
