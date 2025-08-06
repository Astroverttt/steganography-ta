/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Atau 'https'
        hostname: "reverse-proxy-587824585699.us-central1.run.app", // Atau 'your-cdn.com', dll.
        pathname: "/static/**", // Path di server Anda
      },
    ],
  },
  // Konfigurasi lain jika ada
};

module.exports = nextConfig;
