"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JusoorLogo } from "@/components/ui/jusoor-logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - no real auth
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f7f4] dark:bg-[#0a1a14] p-4">
      <Card className="w-full max-w-md border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm">
        <CardHeader className="text-center gap-2">
          <div className="flex flex-col items-center gap-4">
            <JusoorLogo className="w-20 h-20" />
            <CardTitle className="text-2xl font-black text-primary">
              جسور
            </CardTitle>
          </div>
          <CardDescription className="text-[#4a7c66] dark:text-[#a3d9be]">
            أدخل بياناتك للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[#1a3c34] dark:text-[#b8e6d0]">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmad@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#d1e7dd] dark:border-[#2d6a56] focus-visible:ring-[#2d6a56]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-[#1a3c34] dark:text-[#b8e6d0]">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#d1e7dd] dark:border-[#2d6a56] focus-visible:ring-[#2d6a56]"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14] text-lg py-6 rounded-xl font-semibold"
            >
              تسجيل الدخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
