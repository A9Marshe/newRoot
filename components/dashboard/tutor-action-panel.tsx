"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lesson, mockLessons } from "@/lib/mock";
import { CheckCircle, Lock, Trophy, BookOpen, Users, ChartLineUp, Flower } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TutorActionPanelProps {
  studentName: string;
}

export function TutorActionPanel({ studentName }: TutorActionPanelProps) {
  const level1Lessons = mockLessons.filter(l => l.level_index === 1);

  return (
    <div className="space-y-10">
      {/* Overview Stats for Tutor */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "الطلاب النشطون", value: "12", icon: Users, color: "bg-primary/10 text-primary" },
          { label: "الدروس المنجزة", value: "48", icon: BookOpen, color: "bg-green-500/10 text-green-600" },
          { label: "معدل الإتقان", value: "84%", icon: ChartLineUp, color: "bg-orange-500/10 text-orange-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-border shadow-sm flex items-center gap-5 transition-all hover:border-primary/20 hover:shadow-lg">
            <div className={cn("p-4 rounded-2xl", stat.color)}>
              <stat.icon size={28} weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Lesson Management */}
        <Card className="xl:col-span-2 border-2 border-border rounded-[2.5rem] bg-white overflow-hidden shadow-sm relative">
           {/* Decorative Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10 pointer-events-none" />
          
          <CardHeader className="relative z-10 pb-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black">إدارة المسار لـ {studentName}</CardTitle>
                <CardDescription className="font-bold text-muted-foreground">تحكم في الدروس والوصول التعليمي</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-xl px-3 py-1 font-black text-[10px]">
                المستوى 1: الحروف
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-2">
              {level1Lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 rounded-2xl flex items-center justify-between group hover:bg-muted/30 transition-all border border-transparent hover:border-border">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center font-black text-muted-foreground text-lg group-hover:bg-white group-hover:text-primary transition-colors">
                      {lesson.order_index}
                    </div>
                    <div>
                      <p className="font-black text-foreground text-lg leading-none mb-1">{lesson.title_ar}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                        آخر تحديث: {lesson.created_at.toLocaleDateString('ar-SY')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-all">
                            <CheckCircle size={22} weight="bold" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="rounded-lg font-bold">تعليم كمكتمل</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-black border-2 transition-all hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20">
                      <Lock size={18} weight="fill" /> قفل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Achievement Rewards */}
        <div className="space-y-6">
          <Card className="border-2 border-border rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent shadow-sm relative overflow-hidden">
             <div className="absolute top-2 right-2 text-primary/5">
                <Flower size={80} weight="fill" />
              </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600">
                  <Trophy size={22} weight="duotone" />
                </div>
                مكافآت فورية
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 relative z-10">
              {[
                { icon: "🌟", label: 'منح وسام "المثابر"' },
                { icon: "⚡", label: "إضافة 50 XP تشجيعية" },
                { icon: "📝", label: "إرسال ملاحظة تشجيعية" },
              ].map((action, i) => (
                <Button key={i} className="w-full h-14 justify-start gap-4 bg-white hover:bg-primary hover:text-white text-foreground border-2 border-border shadow-sm rounded-2xl font-black transition-all" variant="outline">
                  <span className="text-xl">{action.icon}</span> {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-border rounded-[2.5rem] bg-white shadow-sm overflow-hidden group">
            <CardHeader>
              <CardTitle className="text-xl font-black">تخصيص الخطة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold text-muted-foreground mb-6 leading-relaxed">
                تعديل وتيرة التعلم بناءً على الأداء الأخير وتحليل الذكاء الاصطناعي.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 rounded-xl font-black border-2 group-hover:border-primary/20">مراجعة مكثفة</Button>
                <Button variant="outline" className="h-12 rounded-xl font-black border-2 group-hover:border-primary/20">تحدي متقدم</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
