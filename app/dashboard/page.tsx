"use client";

import { useState } from "react";
import { 
  mockStudents, 
  mockProgress, 
  getStudentStats, 
  levelTitles, 
  getLevelTitle,
  mockProfile
} from "@/lib/mock";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressVisualizer } from "@/components/dashboard/progress-visualizer";
import { TutorActionPanel } from "@/components/dashboard/tutor-action-panel";
import { CityDiscovery } from "@/components/dashboard/city-discovery";
import { StoryReader } from "@/components/dashboard/story-reader";
import { BadgeList, BadgeDisplay } from "@/components/badge-display";
import { JusoorLogo } from "@/components/ui/jusoor-logo";
import { 
  Users, 
  Student, 
  PresentationChart, 
  PlusCircle, 
  Fire, 
  Trophy, 
  GraduationCap, 
  ChartBar,
  Compass,
  SignOut
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [selectedStudentId, setSelectedStudentId] = useState(mockStudents[0].id);
  const [activeTab, setActiveTab] = useState("parent");
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  const selectedStudent = mockStudents.find((s) => s.id === selectedStudentId) || mockStudents[0];
  const studentStats = getStudentStats(selectedStudent.id);
  const completedLessonsCount = mockProgress.filter((p) => p.student_id === selectedStudent.id).length;
  
  const levelInfo = getLevelTitle(selectedStudent.total_xp);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Sidebar-style Nav (Integrated into Top for MVP) */}
      <header className="border-b border-border/40 bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <JusoorLogo className="w-10 h-10" />
              <span className="text-xl font-black tracking-tighter text-primary">جسور</span>
            </div>
            <nav className="hidden md:flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
              {[
                { id: "parent", label: "ولي الأمر", icon: Users },
                { id: "student", label: "الطالب", icon: Student },
                { id: "tutor", label: "المعلم", icon: PresentationChart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all",
                    activeTab === tab.id 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon size={16} weight={activeTab === tab.id ? "fill" : "bold"} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-xl border border-border/50">
               <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger className="w-[140px] border-none bg-transparent h-auto p-0 font-black text-xs focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50">
                  {mockStudents.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="font-bold text-xs">{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <SignOut size={20} weight="bold" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10 relative">
        {/* Subtle Syrian Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0.5px,_transparent_0.5px)] bg-[size:32px_32px] opacity-[0.03] pointer-events-none" />

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Compass size={32} weight="fill" className="text-primary" />
              {activeTab === "parent" ? "نظرة شاملة" : activeTab === "student" ? "رحلة التعلم" : "لوحة المعلم"}
            </h1>
            <p className="text-muted-foreground font-semibold text-sm">مرحباً {mockProfile.display_name}، نتابع تقدم {selectedStudent.name} في سوريا.</p>
          </div>

          {activeTab === "parent" && (
            <Button onClick={() => setIsAddChildOpen(true)} className="rounded-xl font-black gap-2 h-12 shadow-lg shadow-primary/10">
              <PlusCircle size={20} weight="bold" />
              إضافة طفل
            </Button>
          )}
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-10 relative z-10"
          >
            {activeTab === "parent" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="المستوى" 
                    value={levelInfo.title_ar} 
                    label={`XP: ${selectedStudent.total_xp}`} 
                    icon={<GraduationCap size={24} weight="duotone" />}
                    variant="vibrant"
                  />
                  <StatCard 
                    title="السلسلة" 
                    value={studentStats.streak_days} 
                    label="أيام" 
                    icon={<Fire size={24} weight="duotone" className="text-orange-500" />}
                  />
                  <StatCard 
                    title="الدروس" 
                    value={completedLessonsCount} 
                    label="درس" 
                    icon={<ChartBar size={24} weight="duotone" className="text-primary" />}
                  />
                  <StatCard 
                    title="الأوسمة" 
                    value={studentStats.achievements.length} 
                    label="وسام" 
                    icon={<Trophy size={24} weight="duotone" className="text-secondary" />}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                     <ProgressVisualizer 
                      skills={studentStats.skills} 
                      weeklyActivity={studentStats.weekly_activity} 
                      studentName={selectedStudent.name}
                    />
                  </div>
                  <div className="space-y-8">
                    <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col items-center text-center gap-6 relative overflow-hidden group hover:bg-primary/10 transition-colors">
                      <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xl border border-primary/5 relative z-10">
                        <Trophy size={40} weight="fill" />
                      </div>
                      <div className="space-y-2 relative z-10">
                        <h3 className="text-xl font-black">إنجاز جديد!</h3>
                        <p className="text-sm text-muted-foreground font-semibold leading-relaxed">أكملت {selectedStudent.name} تحدي الياسمين بنجاح باهر.</p>
                      </div>
                      <Button variant="outline" className="w-full rounded-xl font-black h-11 bg-white border border-border hover:border-primary/20 transition-all" onClick={() => setShowBadges(true)}>
                        الأوسمة
                      </Button>
                    </div>

                    <div className="bg-foreground text-background rounded-3xl p-8 space-y-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-bl-full opacity-20" />
                      <div className="space-y-2">
                        <h4 className="font-black flex items-center gap-2 text-lg">
                          <Fire size={20} weight="fill" className="text-primary" />
                          تحدي اليوم
                        </h4>
                        <p className="text-xs font-semibold text-background/70 leading-relaxed">حافظ على السلسلة عبر إكمال درس اليوم في حلب القديمة.</p>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl font-black h-11 text-background">ابدأ الآن</Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "student" && (
               <div className="space-y-12">
                 <CityDiscovery 
                    discoveredCityIds={studentStats.discovered_cities} 
                    studentName={selectedStudent.name} 
                  />

                 <StoryReader />

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <ProgressVisualizer 
                      skills={studentStats.skills} 
                      weeklyActivity={studentStats.weekly_activity} 
                      studentName={selectedStudent.name}
                    />
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                        <Trophy size={24} weight="fill" className="text-secondary" />
                        تحليل المهارات
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {studentStats.skills.map((skill, i) => (
                          <div key={i} className="p-6 rounded-2xl bg-white border border-border shadow-sm flex flex-col gap-5 hover:border-primary/20 transition-all card-shadow">
                            <div className="flex justify-between items-center">
                              <span className="font-black text-lg">{skill.category_ar}</span>
                              <BadgeDisplay 
                                earnedBadges={[skill.score > 80 ? "perfect-score" : "first-letter"]} 
                                size="sm" 
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                <span>الإتقان</span>
                                <span>{skill.score}%</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.score}%` }}
                                  className="h-full bg-primary" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               </div>
            )}

            {activeTab === "tutor" && (
              <TutorActionPanel studentName={selectedStudent.name} />
            )}
          </motion.div>
        </AnimatePresence>

        <Dialog open={showBadges} onOpenChange={setShowBadges}>
          <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border border-border/50 shadow-2xl">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-2xl font-black flex items-center gap-3">
                <Trophy size={32} weight="fill" className="text-secondary" />
                أوسمة {selectedStudent.name}
              </DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <BadgeList earnedBadges={studentStats.achievements} />
            </div>
            <Button className="w-full h-12 rounded-xl font-black mt-4" onClick={() => setShowBadges(false)}>إغلاق</Button>
          </DialogContent>
        </Dialog>
      </main>

      <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">إضافة طفل جديد</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">اسم الطفل</Label>
              <Input placeholder="ياسمين" className="h-12 rounded-xl border-border focus:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">العمر</Label>
              <Input type="number" placeholder="7" className="h-12 rounded-xl border-border focus:ring-primary/20" />
            </div>
            <Button type="button" className="w-full h-12 text-md font-black mt-4 rounded-xl" onClick={() => setIsAddChildOpen(false)}>حفظ</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
