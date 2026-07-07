import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ai",
        destination: "/config",
        permanent: true,
      },
      {
        source: "/legal",
        destination: "/config",
        permanent: true,
      },
      {
        source: "/quant",
        destination: "/config",
        permanent: true,
      },
      {
        source: "/python-editor",
        destination: "/config",
        permanent: true,
      },
      {
        source: "/python",
        destination: "/config",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
