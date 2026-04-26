import type { NextConfig } from "next";

const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = raw
  ? `/${raw.replace(/^\/+/, "").replace(/\/+$/, "")}`
  : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  ...(basePath
    ? { basePath, assetPrefix: basePath }
    : {}),
};

export default nextConfig;
