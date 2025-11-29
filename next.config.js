/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig
