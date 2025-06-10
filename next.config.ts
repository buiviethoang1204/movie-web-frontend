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
};

export default nextConfig;
