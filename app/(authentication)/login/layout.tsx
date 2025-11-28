import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Map Service",
  description: "Login to Map Service",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
