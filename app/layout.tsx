import type { Metadata } from "next";
import { Kanit, } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
});


export const metadata: Metadata = {
  title: "DEMO ระบบจัดการพื้นที่ในตำบล",
  description: "ระบบจัดการข้อมูลพื้นที่ในตำบล",
};

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
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
