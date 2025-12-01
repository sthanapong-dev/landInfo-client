'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import apiClient from '@/libs/apiClient';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { token, refreshToken, setToken, setUser, logout } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Wait for zustand to hydrate from storage
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isCancelled = false;

    const checkAuth = async () => {
      // Debug: แสดงค่า token และ refreshToken
      console.log('AuthGuard - Checking auth:', { 
        hasToken: !!token, 
        hasRefreshToken: !!refreshToken,
        tokenValue: token ? 'exists' : 'null/empty',
        refreshTokenValue: refreshToken ? 'exists' : 'null/empty'
      });

      // ตรวจสอบว่ามี token และ refreshToken จริงๆ (ไม่ใช่ค่าว่าง)
      const hasToken = token && token.trim() !== '';
      const hasRefreshToken = refreshToken && refreshToken.trim() !== '';

      // ถ้าไม่มี token และ refreshToken ให้ redirect ไป login ทันที
      if (!hasToken && !hasRefreshToken) {
        console.log('AuthGuard - No valid tokens, redirecting to login');
        if (!isCancelled) {
          logout();
          setIsChecking(false);
          window.location.href = '/login';
        }
        return;
      }

      // เรียก /me ทุกครั้งเพื่อตรวจสอบและดึงข้อมูล user ล่าสุด
      try {
        const userResp = await apiClient.get('/api/v1/auth/me');
        if (!isCancelled && userResp.status === 200 && userResp.data.data?.[0]) {
          setUser(userResp.data.data[0]);
          setIsChecking(false);
          return;
        }
      } catch (err: any) {
        // ถ้า token หมดอายุ (401) ให้ลอง refresh token
        if (err?.response?.status === 401 && refreshToken && !isCancelled) {
          try {
            const resp = await apiClient.post('/api/v1/auth/refresh-token', {
              refreshToken,
            });

            if (!isCancelled && resp.status === 200) {
              setToken(resp.data.token);

              // หลังจาก refresh token สำเร็จ ให้เรียก /me อีกครั้ง
              try {
                const userResp = await apiClient.get('/api/v1/auth/me');
                if (!isCancelled && userResp.status === 200 && userResp.data.data?.[0]) {
                  setUser(userResp.data.data[0]);
                  setIsChecking(false);
                  return;
                }
              } catch (userErr) {
                if (!isCancelled) {
                  console.error('Failed to fetch user data after refresh:', userErr);
                }
              }
            }
          } catch (refreshErr) {
            if (!isCancelled) {
              console.error('Refresh token failed:', refreshErr);
            }
          }
        } else {
          if (!isCancelled) {
            console.error('Token verification failed:', err);
          }
        }
      }

      // ถ้าทุกอย่างล้มเหลว ให้ logout และ redirect ไป login
      if (!isCancelled) {
        logout();
        setIsChecking(false);
        window.location.href = '/login';
      }
    };

    checkAuth();

    return () => {
      isCancelled = true;
    };
  }, [mounted, token, refreshToken, setToken, setUser, logout, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
