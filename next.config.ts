import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost:3000", "192.168.1.96", "192.168.1.168", "10.60.91.240"],
};

export default nextConfig;
