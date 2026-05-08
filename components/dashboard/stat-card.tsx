import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconProps } from "@phosphor-icons/react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  label?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
  variant?: "default" | "vibrant";
}

export function StatCard({
  title,
  value,
  label,
  icon,
  trend,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "border-2 border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 rounded-[2rem]",
        variant === "vibrant"
          ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
          : "bg-white",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
        <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">
          {title}
        </CardTitle>
        <div className="text-primary/60 p-2 rounded-xl bg-primary/5">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-black tracking-tighter text-foreground">
            {value}
          </div>
          {label && (
            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-tight">
              {label}
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-2 px-2 py-1 rounded-lg bg-green-500/5 w-fit border border-green-500/10">
            <span
              className={cn(
                "text-[10px] font-black",
                trend.isUp ? "text-green-600" : "text-destructive"
              )}
            >
              {trend.isUp ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">
              نمو مستمر
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
