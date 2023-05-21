const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experiments: {
    appDir: true,
  },
};

module.exports = withVanillaExtract(nextConfig);
