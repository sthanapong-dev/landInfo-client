'use client';
import NavbarComponents from "@/components/layouts/NavbarComponents";
import DrawerMenu from "@/components/layouts/Management/DrawerMenu";
import MainContent from "@/components/layouts/Management/MainContent";

export default function managementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-auto relative">
      <NavbarComponents />
      <div className="pt-14 flex h-auto text-gray-900">
        <DrawerMenu />
        <MainContent>
          {children}
        </MainContent>
      </div>
    </div>
  );
}
