import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Pajangan",
  description:
    "A platform for artists to showcase their work and connect with the community.",
  icons: [{ rel: "icon", url: "/pajangan_logo.png" }],
  authors: [{ name: "Muhammad Farel Arayasatya" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
