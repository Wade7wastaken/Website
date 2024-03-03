/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // we only ever do static exports, so images can stay unoptimized
  images: {
    unoptimized: true,
  },
  // when building for different hosts, the base path must be changed for links
  // to work
  basePath: process.env.BASE_PATH,
};

module.exports = nextConfig;
