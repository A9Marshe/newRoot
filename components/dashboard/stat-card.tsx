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
        "border border-border/50 bg-white card-shadow rounded-2xl overflow-hidden transition-all duration-300",
        variant === "vibrant"
          ? "bg-gradient-to-br from-primary/[0.03] to-primary/[0.08] border-primary/20"
          : "bg-white",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          {title}
        </CardTitle>
        <div className="text-primary/70 p-2 rounded-lg bg-primary/5">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-black tracking-tight text-foreground">
            {value}
          </div>
          {label && (
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              {label}
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(
              "px-1.5 py-0.5 rounded text-[9px] font-black border",
              trend.isUp ? "bg-green-500/5 text-green-600 border-green-500/10" : "bg-destructive/5 text-destructive border-destructive/10"
            )}>
              {trend.isUp ? "↑" : "↓"} {trend.value}
            </div>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tight">
              نمو مستمر
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
