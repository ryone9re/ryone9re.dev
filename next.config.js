/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true
  },
  transpilePackages: ['@react-three/postprocessing']
};

module.exports = nextConfig;
