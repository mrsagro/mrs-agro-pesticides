import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
