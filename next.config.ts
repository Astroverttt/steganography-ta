import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Atau 'https'
        hostname: "localhost", // Atau 'your-cdn.com', dll.
        port: "8000", // Port backend Anda jika localhost
        pathname: "/static/**", // Path di server Anda
      },
    ],
  },
};

export default nextConfig;
