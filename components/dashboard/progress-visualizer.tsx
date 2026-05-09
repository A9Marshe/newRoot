"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SkillStrength, DailyActivity } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChartBar, Brain } from "@phosphor-icons/react";

interface ProgressVisualizerProps {
  skills: SkillStrength[];
  weeklyActivity: DailyActivity[];
  studentName: string;
}

export function ProgressVisualizer({
  skills,
  weeklyActivity,
  studentName,
}: ProgressVisualizerProps) {
  const maxXP = Math.max(...weeklyActivity.map((a) => a.xp), 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Weekly Activity Chart */}
      <Card className="border border-border/50 rounded-2xl bg-white overflow-hidden card-shadow">
        <CardHeader className="pb-4 pt-8 px-8">
          <CardTitle className="text-[10px] font-black flex items-center gap-3 uppercase tracking-[0.2em]">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ChartBar size={20} weight="fill" />
            </div>
            النشاط الأسبوعي
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="flex items-end justify-between h-48 gap-4 pt-4">
            {weeklyActivity.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex flex-col justify-end h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.xp / maxXP) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.05, ease: "easeOut" }}
                    className={cn(
                      "w-full rounded-t-lg transition-colors duration-300",
                      day.xp > 0 ? "bg-primary/30 group-hover:bg-primary shadow-sm" : "bg-muted/50"
                    )}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                  {day.day_ar}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Progress */}
      <Card className="border border-border/50 rounded-2xl bg-white card-shadow overflow-hidden relative">
        <CardHeader className="pb-8 pt-8 px-8">
          <CardTitle className="text-[10px] font-black flex items-center gap-3 uppercase tracking-[0.2em]">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary-foreground">
              <Brain size={20} weight="fill" />
            </div>
            المهارات المكتسبة
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 px-8 pb-10">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-black text-xs text-foreground uppercase tracking-tight">{skill.category_ar}</span>
                <span className="text-[9px] font-black text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{skill.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.score}%` }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <div className="text-center py-16 text-muted-foreground italic font-medium">
              لا توجد بيانات مهارات متاحة حالياً
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
