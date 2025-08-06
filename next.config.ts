import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Atau 'https'
        hostname: "reverse-proxy-587824585699.us-central1.run.app", // Atau 'your-cdn.com', dll.
        pathname: "/static/**", // Path di server Anda
      },
    ],
  },
};

export default nextConfig;
