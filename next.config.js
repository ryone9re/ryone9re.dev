/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  transpilePackages: ['@react-three/postprocessing']
};

module.exports = nextConfig;
