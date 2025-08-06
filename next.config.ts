
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reverse-proxy-587824585699.us-central1.run.app',
        port: '',
        pathname: '/static/**',
      },
      // Tambahkan domain lain jika diperlukan
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/static/**',
      },
    ],
  },
  // Konfigurasi lain jika ada
};

module.exports = nextConfig;