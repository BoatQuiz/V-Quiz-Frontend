import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // (valfritt men rekommenderat för SWA)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
