/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["http2.mlstatic.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5000/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
