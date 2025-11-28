'use client';
import NavbarComponents from "@/components/layouts/NavbarComponents";
import GridLink from "@/components/layouts/GridLink";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="w-full h-auto relative">
      <NavbarComponents />
      <GridLink />
      {children}
    </main>
  );
}
