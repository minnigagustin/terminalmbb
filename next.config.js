/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  env: {
    URL_BACKEND: "http://128.0.204.43:8000/",
  },
};

module.exports = nextConfig;
