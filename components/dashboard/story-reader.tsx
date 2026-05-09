"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { latakiaStories, Story } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { BookOpen, MapPin, Sparkle, X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export function StoryReader() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3 uppercase">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary-foreground">
              <BookOpen size={24} weight="fill" />
            </div>
            حكايا من أرض الأبجدية
          </h3>
          <p className="text-muted-foreground font-semibold text-xs pr-1">قصص ملهمة من تاريخ وحضارة سوريا</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latakiaStories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card 
              className="group cursor-pointer border border-border/50 rounded-2xl bg-white overflow-hidden card-shadow hover:border-primary/20 transition-all duration-500 h-full flex flex-col"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.title_ar} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                  <MapPin size={12} weight="fill" className="text-white" />
                  <span className="text-[9px] font-black text-white uppercase tracking-wider">{story.location}</span>
                </div>
              </div>
              <CardHeader className="flex-1 p-6">
                <CardTitle className="text-lg font-black mb-2 group-hover:text-primary transition-colors leading-tight">{story.title_ar}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs font-medium leading-relaxed">
                  {story.content_ar}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="text-[10px] font-black text-primary flex items-center gap-2 group-hover:translate-x-[-4px] transition-transform">
                  استكشف القصة <ArrowLeft size={14} weight="bold" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <AnimatePresence>
          {selectedStory && (
            <DialogContent className="sm:max-w-[700px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
              <div className="relative h-64 sm:h-72">
                <img 
                  src={selectedStory.imageUrl} 
                  alt={selectedStory.title_ar} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-6 right-8 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">
                    <Sparkle size={14} weight="fill" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedStory.category === 'history' ? 'تاريخ' : 'ثقافة'}</span>
                  </div>
                  <h2 className="text-3xl font-black text-foreground">{selectedStory.title_ar}</h2>
                </div>
              </div>
              
              <div className="p-10 space-y-8">
                <div className="flex items-center gap-4 text-muted-foreground font-black text-[10px] uppercase tracking-widest">
                  <MapPin size={18} weight="fill" className="text-primary" />
                  <span>{selectedStory.location}</span>
                </div>
                
                <p className="text-xl leading-relaxed font-medium text-foreground/80">
                  {selectedStory.content_ar}
                </p>

                <div className="pt-8 border-t flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen size={16} weight="fill" />
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tight">أكمل القراءة للحصول على ٢٠ نقطة</p>
                  </div>
                  <Button className="rounded-xl font-black px-8 h-11" onClick={() => setSelectedStory(null)}>
                    تمت القراءة
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
