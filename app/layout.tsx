'use client';

import { Kanit, } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/guards/AuthGuard";

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={` ${kanit.variable} antialiased bg-gray-100`}
      >
        <AuthGuard>
          <main>
            {children}
          </main>
        </AuthGuard>
      </body>
    </html>
  );
}
