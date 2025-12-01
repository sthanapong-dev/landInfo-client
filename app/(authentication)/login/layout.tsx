'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token, refreshToken } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Wait for zustand to hydrate from storage
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // ถ้ามี token หรือ refreshToken ให้ redirect ไปหน้าแรก
    const hasToken = token && token.trim() !== '';
    const hasRefreshToken = refreshToken && refreshToken.trim() !== '';

    if (hasToken || hasRefreshToken) {
      console.log('Already logged in, redirecting to home');
      window.location.href = '/';
    } else {
      // ถ้าไม่มี token ให้แสดงหน้า login
      setIsChecking(false);
    }
  }, [mounted, token, refreshToken]);

  // แสดง loading ระหว่างตรวจสอบ
  if (!mounted || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-blue-600 to-blue-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">กำลังตรวจสอบ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
