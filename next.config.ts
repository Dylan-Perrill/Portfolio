import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old site's routes, kept alive as permanent redirects.
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
