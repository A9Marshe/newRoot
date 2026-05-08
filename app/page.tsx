"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[#f0f7f4] dark:bg-[#0a1a14] font-sans">
      <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 py-16 gap-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a3c34] dark:text-[#b8e6d0] leading-tight">
            RootBridge
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2d6a56] dark:text-[#8cd4b0]">
            تعلم العربية للأطفال المغتربين
          </h2>
          <p className="text-lg text-[#4a7c66] dark:text-[#a3d9be] max-w-md">
            منصة تعليمية ممتعة تساعد أطفال الجاليات العربية على تعلم اللغة العربية والاندماج في النظام التعليمي بسهولة
          </p>
          <Link href="/placement">
            <Button className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14] text-lg px-8 py-6 rounded-xl font-semibold">
              ابدأ رحلة التعلم
            </Button>
          </Link>
        </section>

        {/* Value Proposition */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            {
              title: "تعلم ممتع",
              desc: "ألعاب وتحديات لجعل التعلم ممتعاً ومناسباً للأطفال",
              icon: "🎮",
            },
            {
              title: "محتوى مخصص",
              desc: "دروس مصممة خصيصاً للأطفال المغتربين لتناسب مستواهم",
              icon: "📚",
            },
            {
              title: "تتبع التقدم",
              desc: "لوحة تحكم للأهل لمتابعة تقدم أطفالهم بدقة",
              icon: "📈",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-[#1a3c34] p-6 rounded-2xl shadow-sm border border-[#d1e7dd] dark:border-[#2d6a56] flex flex-col items-center text-center gap-3"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-xl font-semibold text-[#1a3c34] dark:text-[#b8e6d0]">
                {item.title}
              </h3>
              <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center gap-4 text-center">
          <p className="text-[#4a7c66] dark:text-[#a3d9be] max-w-md">
            انضم إلى آلاف الأسر التي تستخدم RootBridge لمساعدة أطفالهم على تعلم العربية بثقة
          </p>
          <Link href="/login">
            <Button variant="outline" className="border-[#2d6a56] text-[#2d6a56] hover:bg-[#d1e7dd] dark:border-[#8cd4b0] dark:text-[#8cd4b0] dark:hover:bg-[#1a3c34] text-lg px-8 py-6 rounded-xl font-semibold">
              تسجيل الدخول كولي أمر
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
