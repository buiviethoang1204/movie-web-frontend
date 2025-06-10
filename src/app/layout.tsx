// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchInput from "@/components/SearchInput"; // Import SearchInput
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Web App",
  description: "A movie streaming website built with Next.js and NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header (Navbar) */}
        <header className="bg-gray-900 text-white p-4 shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="hover:text-gray-300">
                MovieApp
              </Link>
              {/* Thêm link về trang chủ */}
            </h1>
            <SearchInput /> {/* Sử dụng SearchInput component */}
          </div>
        </header>

        {/* Main content area */}
        <main className="min-h-screen bg-gray-800 text-gray-100">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 p-4 text-center text-sm">
          <div className="container mx-auto">
            <p>
              &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
            </p>
            <p>Built with Next.js, NestJS, and MongoDB.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
