import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // To avoid Build Error: Unknown module type
  serverExternalPackages: ["esbuild"],
};

export default nextConfig;
