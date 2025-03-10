import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveAlias: {
        underscore: "lodash",
      },
    },
  },
};

export default nextConfig;
