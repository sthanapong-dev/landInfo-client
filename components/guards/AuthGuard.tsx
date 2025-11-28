'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import apiClient from '@/libs/apiClient';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { token, refreshToken, setToken, setUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
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
      // Skip auth check for login page
      if (pathname === '/login') {
        if (!isCancelled) setIsChecking(false);
        return;
      }

      // If no token and no refresh token, redirect to login
      if (!token && !refreshToken) {
        if (!isCancelled) {
          router.push('/login');
          setIsChecking(false);
        }
        return;
      }

      // If has token, verify it (only on first mount, not on path change)
      if (token) {
        try {
          const userResp = await apiClient.get('/api/v1/auth/me');
          if (!isCancelled && userResp.status === 200 && userResp.data.data?.[0]) {
            setUser(userResp.data.data[0]);
            setIsChecking(false);
            return;
          }
        } catch (err) {
          if (!isCancelled) {
            console.error('Token verification failed:', err);
          }
        }
      }

      // Try to refresh token if available
      if (refreshToken && !isCancelled) {
        try {
          const resp = await apiClient.post('/api/v1/auth/refresh-token', {
            refreshToken,
          });

          if (!isCancelled && resp.status === 200) {
            setToken(resp.data.token);

            // Fetch user data
            try {
              const userResp = await apiClient.get('/api/v1/auth/me');
              if (!isCancelled && userResp.status === 200 && userResp.data.data?.[0]) {
                setUser(userResp.data.data[0]);
              }
            } catch (err) {
              if (!isCancelled) {
                console.error('Failed to fetch user data:', err);
              }
            }

            setIsChecking(false);
            return;
          }
        } catch (err) {
          if (!isCancelled) {
            console.error('Refresh token error:', err);
          }
        }
      }

      // If all fails, redirect to login
      if (!isCancelled) {
        router.push('/login');
        setIsChecking(false);
      }
    };

    checkAuth();

    return () => {
      isCancelled = true;
    };
  }, [mounted, token, refreshToken]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
