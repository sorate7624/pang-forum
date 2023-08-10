const path = require('path/posix');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/variables.scss"; @import "styles/common.scss";`,
  },
};

module.exports = nextConfig;
