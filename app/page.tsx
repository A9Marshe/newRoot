"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkle, 
  MapPin, 
  GraduationCap, 
  Users, 
  Heart,
  GlobeHemisphereEast,
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <GlobeHemisphereEast size={22} weight="bold" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">RootBridge</span>
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
        {/* Hero Section: Vercel Style High Contrast */}
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
              جسر يربطك <br />
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

            <div className="flex items-center gap-8 pt-4 grayscale opacity-40">
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <Compass size={20} /> استكشاف
              </div>
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <Translate size={20} /> تعلم
              </div>
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <Heart size={20} /> انتماء
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 flex items-center justify-center border border-border/50 shadow-2xl overflow-hidden group">
              {/* Mock App UI Preview */}
              <div className="w-[85%] h-[85%] bg-white rounded-3xl shadow-2xl border border-border/50 p-8 space-y-6 transform group-hover:scale-[1.02] transition-transform duration-700">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-muted rounded-full" />
                    <div className="h-6 w-32 bg-primary/10 rounded-full" />
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-muted/50 rounded-2xl border border-dashed border-border" />
                  <div className="aspect-video bg-muted/50 rounded-2xl border border-dashed border-border" />
                </div>
                <div className="h-32 bg-secondary/5 rounded-3xl border border-secondary/10 flex items-center justify-center">
                  <Sparkle size={32} className="text-secondary" />
                </div>
              </div>
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary border border-border"
              >
                <MapPin size={24} weight="fill" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Unified Journey Grid */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">منهجية متكاملة لكل سوريا</h2>
            <p className="text-muted-foreground font-medium max-w-xl">نحن لا نعلم اللغة فحسب، بل نفتح أبواباً نحو مدن وتاريخ سوريا المذهل.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "رحلة المدن السورية",
                desc: "اكتشف دمشق، حلب، وتدمر. كل مستوى تعليمي يفتح لك مدينة جديدة بمعالمها وحكاياها.",
                icon: MapPin,
                color: "text-primary",
              },
              {
                title: "الأبجدية في موطنها",
                desc: "من أوغاريت، أول موطن للأبجدية، نبدأ رحلة طفلك في إتقان اللغة العربية بأسلوب حديث.",
                icon: GraduationCap,
                color: "text-secondary-foreground",
              },
              {
                title: "مجتمع الهوية",
                desc: "نربط العائلات في المغترب بمجتمع تعليمي سوري ينمو معاً، محافظاً على الجذور الحية.",
                icon: Users,
                color: "text-primary",
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 card-shadow group">
                <div className={cn("mb-6 transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon size={36} weight="duotone" />
                </div>
                <h3 className="text-xl font-black mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Syrian Map Callout */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="bg-foreground text-background rounded-[2rem] p-12 md:p-20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 grayscale group-hover:opacity-20 transition-opacity">
               {/* Pattern / Map Silhouette Placeholder */}
               <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:20px_20px]" />
            </div>
            
            <div className="max-w-2xl space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                أكثر من مجرد دروس. <br />
                إنها رحلة عودة.
              </h2>
              <p className="text-lg text-background/70 font-medium leading-relaxed">
                في RootBridge، كل درس هو خطوة نحو العودة المعنوية. يتعلم الطلاب اللغة من خلال التفاعل مع تاريخهم السوري، لتبقى الجذور حية في كل كلمة ينطقونها.
              </p>
              <Button size="lg" variant="secondary" className="font-black rounded-xl h-14 px-8 text-lg">
                اكتشف المسار التعليمي
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <GlobeHemisphereEast size={20} weight="bold" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase">RootBridge</span>
            </div>
            <p className="text-xs text-muted-foreground font-bold leading-relaxed">
              نبني جسراً رقمياً للهوية السورية، لتمكين أطفالنا في المغترب من لغتهم وثقافتهم العريقة.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest">المنصة</h4>
              <div className="flex flex-col gap-3 text-sm font-semibold text-muted-foreground">
                <Link href="#" className="hover:text-primary">المدن</Link>
                <Link href="#" className="hover:text-primary">القصص</Link>
                <Link href="#" className="hover:text-primary">المعلمون</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest">المجتمع</h4>
              <div className="flex flex-col gap-3 text-sm font-semibold text-muted-foreground">
                <Link href="#" className="hover:text-primary">عن المشروع</Link>
                <Link href="#" className="hover:text-primary">الشركاء</Link>
                <Link href="#" className="hover:text-primary">تواصل معنا</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border/50 flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          <span>© ٢٠٢٦ ROOTBRIDGE. صنع من أجل سوريا.</span>
          <div className="flex gap-6">
            <Link href="#">الشروط</Link>
            <Link href="#">الخصوصية</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
