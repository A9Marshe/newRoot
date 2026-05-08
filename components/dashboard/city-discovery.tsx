"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SyrianCity, syrianCities } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { MapTrifold, LockKey, CheckCircle, Flower } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface CityDiscoveryProps {
  discoveredCityIds: string[];
  studentName: string;
}

export function CityDiscovery({ discoveredCityIds, studentName }: CityDiscoveryProps) {
  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-background to-accent/5 overflow-hidden relative">
      {/* Decorative Jasmine Flowers */}
      <div className="absolute top-2 right-2 text-primary/10 rotate-12">
        <Flower size={120} weight="fill" />
      </div>
      <div className="absolute -bottom-8 -left-8 text-secondary/10 -rotate-12">
        <Flower size={160} weight="fill" />
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <MapTrifold size={28} weight="duotone" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black">رحلة {studentName} في سوريا</CardTitle>
            <CardDescription className="text-muted-foreground font-medium">استكشف المدن والمعالم التاريخية أثناء تعلمك</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {syrianCities.map((city, idx) => {
            const isDiscovered = discoveredCityIds.includes(city.id);
            return (
              <motion.div
                key={city.id}
                whileHover={{ y: -5 }}
                className={cn(
                  "relative group rounded-3xl p-5 border-2 transition-all duration-500",
                  isDiscovered 
                    ? "bg-white border-primary/20 shadow-lg shadow-primary/5" 
                    : "bg-muted/30 border-dashed border-border opacity-70"
                )}
              >
                {!isDiscovered && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 rounded-3xl z-20 backdrop-blur-[1px]">
                    <LockKey size={32} weight="fill" className="text-muted-foreground/50 mb-2" />
                    <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-tighter">أكمل المستوى التالي للفتح</p>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black transition-colors",
                      isDiscovered ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {city.name_ar[0]}
                    </div>
                    {isDiscovered && (
                      <CheckCircle size={20} weight="fill" className="text-green-500" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-xl text-foreground">{city.name_ar}</h4>
                    <p className="text-xs font-bold text-primary/80 uppercase tracking-widest">{city.landmark}</p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {city.description_ar}
                  </p>

                  {isDiscovered && (
                    <div className="pt-2">
                      <Badge variant="outline" className="bg-primary/5 text-[10px] border-primary/20 font-bold">
                        تمت الزيارة ✨
                      </Badge>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
