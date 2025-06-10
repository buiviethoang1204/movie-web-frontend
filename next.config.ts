import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // Thêm các hostname mà bạn sẽ tải ảnh từ đó
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "**", // Cho phép bất kỳ đường dẫn nào sau hostname
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true, // THÊM DÒNG NÀY
  },
};

export default nextConfig;
