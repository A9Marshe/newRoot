"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { syrianCities } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { MapPin, Compass, Sparkle, Lock, GlobeHemisphereEast } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

interface CityDiscoveryProps {
  discoveredCityIds: string[];
  studentName: string;
}

export function CityDiscovery({ discoveredCityIds, studentName }: CityDiscoveryProps) {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(discoveredCityIds[0] || "damascus");

  const selectedCity = syrianCities.find(c => c.id === selectedCityId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3 uppercase">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Compass size={24} weight="fill" />
            </div>
            استكشاف سوريا
          </h3>
          <p className="text-muted-foreground font-semibold text-xs pr-1">اكتشف تاريخ مدننا العريقة مع كل تقدم تحرزه</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* City Selection List */}
        <div className="xl:col-span-1 flex flex-col gap-3">
          {syrianCities.map((city) => {
            const isUnlocked = discoveredCityIds.includes(city.id) || city.unlocked;
            const isSelected = selectedCityId === city.id;

            return (
              <button
                key={city.id}
                onClick={() => isUnlocked && setSelectedCityId(city.id)}
                disabled={!isUnlocked}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group text-right",
                  isSelected 
                    ? "bg-white border-primary shadow-lg ring-1 ring-primary/20" 
                    : isUnlocked 
                      ? "bg-white border-border hover:border-primary/20 hover:shadow-md" 
                      : "bg-muted/50 border-transparent opacity-60 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary text-white" : isUnlocked ? "bg-primary/5 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {isUnlocked ? <MapPin size={24} weight="fill" /> : <Lock size={20} weight="bold" />}
                  </div>
                  <div className="text-right flex-1">
                    <p className={cn("font-black text-sm", isSelected ? "text-primary" : "text-foreground")}>{city.name_ar}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{city.landmark}</p>
                  </div>
                </div>
                {isUnlocked && !isSelected && (
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkle size={16} weight="fill" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed View */}
        <Card className="xl:col-span-2 border border-border/50 rounded-[2rem] bg-white overflow-hidden card-shadow relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {selectedCity && (
              <motion.div
                key={selectedCity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="relative h-48 bg-muted/30">
                   {/* Abstract Pattern as Placeholder for City Imagery */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:24px_24px] opacity-[0.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  
                  <div className="absolute bottom-6 right-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-3">
                      <Sparkle size={12} weight="fill" />
                      <span className="text-[9px] font-black uppercase tracking-widest">معلم تاريخي</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-foreground">{selectedCity.name_ar}</h2>
                  </div>
                </div>

                <CardContent className="flex-1 p-10 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <GlobeHemisphereEast size={18} weight="bold" />
                      عن المدينة
                    </h4>
                    <p className="text-xl font-medium leading-relaxed text-foreground/80">
                      {selectedCity.description_ar}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">المعلم الرئيسي</p>
                        <p className="text-lg font-black">{selectedCity.landmark}</p>
                      </div>
                      <Button variant="outline" className="rounded-xl font-black gap-2 h-10 border-2">
                        استكشف المزيد
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
