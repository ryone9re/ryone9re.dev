/**
 * @type {import('next').NextConfig}
 **/

/* eslint @typescript-eslint/no-var-requires: "off" */
const headers = require('./headers')
const withPWA = require('next-pwa')

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers
      }
    ]
  },
  pwa: {
    dest: 'public'
  }
}

module.exports = withPWA(nextConfig)
