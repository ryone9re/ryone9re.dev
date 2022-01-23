/**
 * @type {import('next').NextConfig}
 **/

/* eslint @typescript-eslint/no-var-requires: "off" */
const headers = require('./headers')

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers,
      }
    ]
  }
}

module.exports = nextConfig
