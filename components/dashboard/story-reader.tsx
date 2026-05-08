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
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary/20 text-secondary-foreground">
              <BookOpen size={28} weight="fill" />
            </div>
            حكايا من اللاذقية
          </h3>
          <p className="text-muted-foreground font-semibold">استمع واقرأ قصصاً ممتعة عن تاريخ مدينتنا العريق</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latakiaStories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card 
              className="group cursor-pointer border-2 border-border rounded-[2.5rem] bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 h-full flex flex-col"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.title_ar} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                  <MapPin size={14} weight="fill" className="text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">{story.location}</span>
                </div>
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="text-xl font-black mb-2 group-hover:text-primary transition-colors">{story.title_ar}</CardTitle>
                <CardDescription className="line-clamp-2 font-medium leading-relaxed">
                  {story.content_ar}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" className="w-full rounded-2xl font-black gap-2 border-2 border-transparent group-hover:border-primary/10 group-hover:bg-primary/5">
                  اقرأ القصة <ArrowLeft size={18} weight="bold" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <AnimatePresence>
          {selectedStory && (
            <DialogContent className="sm:max-w-[700px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
              <div className="relative h-64 sm:h-80">
                <img 
                  src={selectedStory.imageUrl} 
                  alt={selectedStory.title_ar} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-foreground transition-all"
                  onClick={() => setSelectedStory(null)}
                >
                  <X size={24} weight="bold" />
                </Button>
                <div className="absolute bottom-8 right-8 space-y-2">
                  <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-primary/30">
                    <Sparkle size={18} weight="fill" className="text-primary" />
                    <span className="text-xs font-black text-primary uppercase tracking-widest">{selectedStory.category === 'history' ? 'تاريخ عريق' : 'ثقافة وتقاليد'}</span>
                  </div>
                  <h2 className="text-4xl font-black text-foreground drop-shadow-sm">{selectedStory.title_ar}</h2>
                </div>
              </div>
              
              <div className="p-8 sm:p-12 space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground font-black text-sm pr-1">
                  <MapPin size={20} weight="fill" className="text-secondary" />
                  <span>الموقع: {selectedStory.location}</span>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl leading-relaxed font-semibold text-foreground/80 first-letter:text-4xl first-letter:font-black">
                    {selectedStory.content_ar}
                  </p>
                </div>

                <div className="pt-8 border-t flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen size={20} weight="fill" />
                    </div>
                    <p className="text-xs font-black text-muted-foreground">أكمل القراءة للحصول على 20 XP</p>
                  </div>
                  <Button className="rounded-2xl font-black px-8 h-12 shadow-lg shadow-primary/20">
                    أنهيت القراءة! ✨
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
