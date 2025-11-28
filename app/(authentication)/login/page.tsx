"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import apiClient from "@/libs/apiClient";

export default function LoginPage() {
  const { setToken, setRefreshToken, setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("devfrank");
  const [password, setPassword] = useState("Password123!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const resp = await apiClient.post('/api/v1/auth/login', {
        usernameOrEmail: usernameOrEmail,
        password: password
      });
      
      if (resp.status === 200) {
        setToken(resp.data.token);
        setRefreshToken(resp.data.refreshToken);
        
        // Fetch user data
        try {
          const userResp = await apiClient.get('/api/v1/auth/me', {
            headers: { Authorization: `Bearer ${resp.data.token}` }
          });
          
          if (userResp.status === 200 && userResp.data.data?.[0]) {
            setUser(userResp.data.data[0]);
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
        
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 p-4">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-br from-blue-600 to-blue-800 px-8 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Map Service</h1>
            <p className="text-blue-100">ระบบจัดการพื้นที่ในตำบล</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {/* usernameOrEmail Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ชื่อผู้ใช้หรืออีเมล
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="username หรือ email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                  minLength={5}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600">จำรหัสผ่านของฉัน</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                ลืมรหัสผ่าน?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-br from-blue-600 to-blue-800 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">หรือ</span>
              </div>
            </div>

            {/* Demo Users */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-gray-600 font-medium">ข้อมูลสำหรับทดสอบ:</p>
              <div className="text-gray-500">
                <p>📧 admin@example.com</p>
                <p>🔑 password123</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-200 text-sm mt-6">
          Map Service © 2025 - ระบบจัดการพื้นที่ในตำบล
        </p>
      </div>
    </div>
  );
}
