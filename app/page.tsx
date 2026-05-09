"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JusoorLogo } from "@/components/ui/jusoor-logo";
import { 
  ArrowLeft, 
  Sparkle, 
  MapPin, 
  GraduationCap, 
  Users, 
  Heart,
  Books,
  Compass,
  Translate
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans">
      {/* Premium Glass Header */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <JusoorLogo className="w-14 h-14" />
            <span className="text-2xl font-black tracking-tighter text-primary">جسور</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground pr-8">
            <Link href="#" className="hover:text-primary transition-colors">المنهج</Link>
            <Link href="#" className="hover:text-primary transition-colors">عن سوريا</Link>
            <Link href="#" className="hover:text-primary transition-colors">الأسعار</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-bold text-sm">دخول</Button>
            </Link>
            <Link href="/login">
              <Button className="font-bold text-sm px-6 rounded-xl">ابدأ الآن</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary">
              <Sparkle size={14} weight="fill" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">أعد اكتشاف هويتك</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-[0.95]">
              جسور تربطك <br />
              بأرض <span className="text-primary">الأبجدية</span>
            </h1>
            
            <p className="text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
              منصة تعليمية متطورة تدمج تعليم اللغة العربية بعمق الثقافة السورية. من أسوار حلب إلى ياسمين دمشق، نبني المستقبل بهوية عريقة.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/placement">
                <Button size="lg" className="h-14 px-10 rounded-xl font-black text-lg gap-3 group transition-all hover:translate-y-[-2px] shadow-xl shadow-primary/10">
                  انطلق في رحلتك
                  <ArrowLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-xl font-black text-lg border-2 hover:bg-muted/50 transition-all">
                  لوحة التحكم
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 flex items-center justify-center border border-border/50 shadow-2xl overflow-hidden group">
               <JusoorLogo className="w-2/3 h-2/3 opacity-90 transition-transform group-hover:scale-105" />
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-2">
              <JusoorLogo className="w-12 h-12" />
              <span className="text-xl font-black tracking-tighter text-primary">جسور</span>
            </div>
            <p className="text-xs text-muted-foreground font-bold leading-relaxed">
              نبني جسراً رقمياً للهوية السورية، لتمكين أطفالنا في المغترب من لغتهم وثقافتهم العريقة.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border/50 flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          <span>© ٢٠٢٦ جسور. صنع من أجل سوريا.</span>
        </div>
      </footer>
    </div>
  );
}
