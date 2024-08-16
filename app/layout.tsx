import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

// test
export const metadata: Metadata = {
  title: "Codecards",
  description: "Study with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className="overflow-hidden">
      {/* <html lang="en" className=""> */}
        <body className={`${inter.className} bg-zinc-900`}>{children} <Analytics /></body>
      </html>
    </ClerkProvider>
  );
}
