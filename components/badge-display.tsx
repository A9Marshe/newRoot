"use client";

import { allAchievements, type Achievement } from "@/lib/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  earnedBadges: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BadgeDisplay({ earnedBadges, size = "md", className }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: "text-xl h-10 w-10",
    md: "text-2xl h-14 w-14",
    lg: "text-4xl h-20 w-20",
  };

  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap gap-3", className)}>
        {allAchievements.map((achievement) => {
          const isEarned = earnedBadges.includes(achievement.id);
          return (
            <Tooltip key={achievement.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "inline-flex items-center justify-center rounded-2xl transition-all duration-300",
                    sizeClasses[size],
                    isEarned
                      ? "bg-primary/10 text-primary shadow-sm border border-primary/20 scale-100 hover:scale-110"
                      : "bg-muted/50 text-muted-foreground opacity-40 grayscale"
                  )}
                >
                  <span>{achievement.icon}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-popover-foreground border-border shadow-xl p-3 rounded-xl max-w-xs">
                <div className="space-y-1">
                  <p className="font-black text-base leading-none">
                    {achievement.title_ar}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {achievement.description_ar}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5">
                    <div className={cn("w-2 h-2 rounded-full", isEarned ? "bg-green-500" : "bg-muted")} />
                    <p className="text-[10px] font-bold uppercase tracking-wider">
                      {isEarned ? "تم الإنجاز" : "لم يكتمل بعد"}
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

interface BadgeListProps {
  earnedBadges: string[];
  className?: string;
}

export function BadgeList({ earnedBadges, className }: BadgeListProps) {
  const earnedAchievements = allAchievements.filter((a) =>
    earnedBadges.includes(a.id)
  );

  if (earnedAchievements.length === 0) {
    return (
      <div className="text-center py-8 px-4 rounded-2xl bg-muted/30 border border-dashed border-border">
        <p className="text-muted-foreground font-medium">
          لم تحصل على أي شارات بعد. أكمل الدروس للحصول على شارات!
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      {earnedAchievements.map((achievement) => (
        <Card
          key={achievement.id}
          className="bg-primary/5 border-primary/10 shadow-none hover:bg-primary/10 transition-colors rounded-2xl overflow-hidden"
        >
          <CardContent className="flex items-center gap-4 py-4">
            <div className="text-3xl bg-white p-2 rounded-xl shadow-sm border border-primary/5">
              {achievement.icon}
            </div>
            <div className="space-y-0.5">
              <p className="font-black text-foreground text-sm">
                {achievement.title_ar}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium leading-tight">
                {achievement.description_ar}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}