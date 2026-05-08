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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Weekly Activity Chart */}
      <Card className="border-2 border-border rounded-[2.5rem] bg-white overflow-hidden shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-black flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ChartBar size={24} weight="fill" />
            </div>
            نشاط {studentName} الأسبوعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-52 gap-3 pt-8 px-4">
            {weeklyActivity.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex flex-col justify-end h-full">
                   {/* Tooltip on hover */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10 shadow-xl"
                  >
                    {day.xp} XP
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.xp / maxXP) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className={cn(
                      "w-full rounded-t-2xl transition-colors duration-300",
                      day.xp > 0 ? "bg-primary/40 group-hover:bg-primary shadow-lg shadow-primary/5" : "bg-muted/40"
                    )}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                  {day.day_ar}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Progress */}
      <Card className="border-2 border-border rounded-[2.5rem] bg-white shadow-sm overflow-hidden relative">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-black flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary/20 text-secondary-foreground">
              <Brain size={24} weight="fill" />
            </div>
            مهارات {studentName}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="font-black text-sm text-foreground">{skill.category_ar}</span>
                <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg">{skill.score}%</span>
              </div>
              <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden border-2 border-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.score}%` }}
                  transition={{ duration: 1.5, delay: idx * 0.2, ease: "backOut" }}
                  className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full shadow-inner"
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
