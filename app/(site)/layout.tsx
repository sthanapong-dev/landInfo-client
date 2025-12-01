'use client';

import AuthGuard from "@/components/guards/AuthGuard";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            { children }
        </AuthGuard>
    );
}
