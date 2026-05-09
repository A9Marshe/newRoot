"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lesson, mockLessons } from "@/lib/mock";
import { CheckCircle, Lock, Trophy, BookOpen, Users, ChartLineUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TutorActionPanelProps {
  studentName: string;
}

export function TutorActionPanel({ studentName }: TutorActionPanelProps) {
  const level1Lessons = mockLessons.filter(l => l.level_index === 1);

  return (
    <div className="space-y-12">
      {/* Overview Stats for Tutor */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { label: "الطلاب النشطون", value: "12", icon: Users, color: "text-primary bg-primary/5" },
          { label: "الدروس المنجزة", value: "48", icon: BookOpen, color: "text-secondary-foreground bg-secondary/10" },
          { label: "معدل الإتقان", value: "84%", icon: ChartLineUp, color: "text-orange-600 bg-orange-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-border/50 card-shadow flex items-center gap-6 group hover:border-primary/20 transition-all">
            <div className={cn("p-4 rounded-xl transition-transform group-hover:scale-110", stat.color)}>
              <stat.icon size={28} weight="duotone" />
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Lesson Management */}
        <Card className="xl:col-span-2 border border-border/50 rounded-[2rem] bg-white overflow-hidden card-shadow">
          <CardHeader className="p-10 pb-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1 text-right">
                <CardTitle className="text-2xl font-black tracking-tight">إدارة المسار التعليمي</CardTitle>
                <CardDescription className="font-medium">تحكم في وتيرة تعلم {studentName} والوصول للدروس</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                المستوى الحالي: ١
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-0">
            <div className="space-y-2">
              {level1Lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 rounded-xl flex items-center justify-between group hover:bg-muted/30 transition-all border border-transparent hover:border-border/50">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center font-black text-muted-foreground text-sm group-hover:bg-white group-hover:text-primary transition-all">
                      {lesson.order_index}
                    </div>
                    <div className="text-right">
                      <p className="font-black text-foreground group-hover:text-primary transition-colors">{lesson.title_ar}</p>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tight">
                        أيار {lesson.created_at.getFullYear()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-all">
                            <CheckCircle size={20} weight="bold" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="rounded-lg font-bold text-xs">مكتمل</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg gap-2 font-black text-xs border-2 transition-all">
                      <Lock size={14} weight="fill" /> قفل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-8">
          <Card className="border border-border/50 rounded-[2rem] bg-foreground text-background card-shadow overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity" />
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <Trophy size={22} weight="fill" className="text-primary" />
                تحفيز الطالب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-3">
              {[
                { label: 'منح وسام "المبدع"' },
                { label: "إضافة نقاط تشجيعية" },
              ].map((action, i) => (
                <Button key={i} className="w-full h-12 justify-start gap-3 bg-white/10 hover:bg-white/20 text-background border border-white/10 rounded-xl font-black text-xs transition-all" variant="ghost">
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/50 rounded-[2rem] bg-white card-shadow overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black">تحليل الأداء</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 text-right">
              <p className="text-xs font-semibold text-muted-foreground leading-relaxed mb-6">
                بناءً على تفاعل {studentName} الأخير في "أوغاريت"، نقترح تكثيف دروس القراءة.
              </p>
              <Button className="w-full h-11 rounded-xl font-black text-xs" variant="outline">تعديل الخطة</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
