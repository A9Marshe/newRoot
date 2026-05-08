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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressVisualizer } from "@/components/dashboard/progress-visualizer";
import { TutorActionPanel } from "@/components/dashboard/tutor-action-panel";
import { CityDiscovery } from "@/components/dashboard/city-discovery";
import { StoryReader } from "@/components/dashboard/story-reader";
import { BadgeList, BadgeDisplay } from "@/components/badge-display";
import { 
  Users, 
  Student, 
  PresentationChart, 
  PlusCircle, 
  Fire, 
  Trophy, 
  GraduationCap, 
  ChartBar,
  Flower
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
  const nextLevel = levelTitles.find((l) => l.minXP > selectedStudent.total_xp);
  const progressToNext = nextLevel
    ? ((selectedStudent.total_xp - (levelTitles.find((l) => l.minXP <= selectedStudent.total_xp)?.minXP || 0)) / (nextLevel.minXP - (levelTitles.find((l) => l.minXP <= selectedStudent.total_xp)?.minXP || 0))) * 100
    : 100;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <div className="grid grid-cols-6 gap-20 p-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <Flower key={i} size={80} weight="fill" className={cn(i % 2 === 0 ? "text-primary" : "text-secondary")} />
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <PresentationChart size={30} weight="bold" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-foreground">
                لوحة التحكم
              </h1>
            </div>
            <p className="text-muted-foreground font-medium pr-1">مرحباً بك مجدداً، {mockProfile.display_name} 👋</p>
          </div>

          <div className="flex items-center gap-3">
            <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-2xl gap-2 px-6 h-14 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-black text-lg">
                  <PlusCircle size={26} weight="bold" />
                  إضافة طفل جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-[2.5rem]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black">إضافة طفل إلى العائلة</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold">اسم الطفل</Label>
                    <Input id="name" placeholder="مثال: ياسمين" className="h-14 text-lg rounded-2xl border-2 focus-visible:ring-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="font-bold">العمر</Label>
                    <Input id="age" type="number" placeholder="7" className="h-14 text-lg rounded-2xl border-2 focus-visible:ring-primary/30" />
                  </div>
                  <Button type="button" className="w-full h-14 text-xl font-black mt-4 rounded-2xl" onClick={() => setIsAddChildOpen(false)}>حفظ التغييرات</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* View Switcher Navigation */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-white/80 backdrop-blur-md rounded-[2rem] border-2 border-border shadow-sm">
          <div className="flex items-center gap-1.5 p-1 bg-muted/30 rounded-[1.75rem]">
            {[
              { id: "parent", label: "بوابة ولي الأمر", icon: Users },
              { id: "student", label: "نظرة عامة", icon: Student },
              { id: "tutor", label: "أدوات المعلم", icon: PresentationChart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-3 rounded-[1.5rem] font-black text-sm transition-all relative overflow-hidden",
                  activeTab === tab.id 
                    ? "bg-white text-primary shadow-md shadow-primary/5 ring-1 ring-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                <tab.icon size={20} weight={activeTab === tab.id ? "fill" : "bold"} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 px-4">
            <Label className="text-muted-foreground font-black text-xs uppercase tracking-widest hidden lg:inline">الطفل الحالي:</Label>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white border-2 border-border font-black rounded-[1.5rem] h-12 shadow-sm focus:ring-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-[10px]">🧒</div>
                  <SelectValue placeholder="اختر طفلاً" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2">
                {mockStudents.map((s) => (
                  <SelectItem key={s.id} value={s.id} className="font-bold py-3">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </nav>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px]"
          >
            {activeTab === "parent" && (
              <section className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="المستوى الحالي" 
                    value={levelInfo.title_ar} 
                    label={`XP: ${selectedStudent.total_xp}`} 
                    icon={<GraduationCap size={32} weight="duotone" />}
                    variant="vibrant"
                  />
                  <StatCard 
                    title="سلسلة التعلم" 
                    value={studentStats.streak_days} 
                    label="أيام متتالية" 
                    icon={<Fire size={32} weight="duotone" className="text-orange-500" />}
                    trend={{ value: "2 يوم", isUp: true }}
                  />
                  <StatCard 
                    title="الدروس المكتملة" 
                    value={completedLessonsCount} 
                    label="درس" 
                    icon={<ChartBar size={32} weight="duotone" className="text-blue-500" />}
                  />
                  <StatCard 
                    title="الأوسمة المحققة" 
                    value={studentStats.achievements.length} 
                    label="وسام" 
                    icon={<Trophy size={32} weight="duotone" className="text-yellow-500" />}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                     <ProgressVisualizer 
                      skills={studentStats.skills} 
                      weeklyActivity={studentStats.weekly_activity} 
                      studentName={selectedStudent.name}
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-[2.5rem] p-8 border-2 border-primary/10 flex flex-col items-center text-center gap-6 relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 text-primary/5 rotate-45 transition-transform group-hover:rotate-[60deg]">
                        <Flower size={160} weight="fill" />
                      </div>
                      <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center text-primary shadow-2xl shadow-primary/10 border-4 border-primary/5 relative z-10">
                        <GraduationCap size={52} weight="fill" />
                      </div>
                      <div className="space-y-3 relative z-10">
                        <h3 className="text-2xl font-black tracking-tight">أداء رائع!</h3>
                        <p className="text-muted-foreground font-semibold leading-relaxed">ياسمين تحرز تقدماً ملحوظاً في مخارج الحروف هذا الأسبوع.</p>
                      </div>
                      <Button variant="outline" className="w-full rounded-2xl font-black h-12 bg-white border-2 hover:bg-primary hover:text-white transition-all relative z-10" onClick={() => setShowBadges(true)}>
                        مشاهدة الأوسمة
                      </Button>
                    </div>

                    <div className="bg-orange-500/5 rounded-[2.5rem] p-6 border-2 border-orange-500/10 space-y-4 relative overflow-hidden">
                      <div className="absolute -bottom-6 -right-6 text-orange-500/5">
                        <Fire size={100} weight="fill" />
                      </div>
                      <h4 className="font-black flex items-center gap-2 text-orange-700 relative z-10">
                        <Fire size={24} weight="fill" />
                        تحدي اليوم
                      </h4>
                      <p className="text-sm font-bold text-orange-900/70 leading-relaxed relative z-10">أكمل درساً واحداً اليوم للحفاظ على سلسلة الـ 3 أيام!</p>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-2xl font-black h-12 shadow-lg shadow-orange-500/20 relative z-10">ابدأ التعلم الآن</Button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "student" && (
               <section className="space-y-12">
                 <CityDiscovery 
                    discoveredCityIds={studentStats.discovered_cities} 
                    studentName={selectedStudent.name} 
                  />

                 <StoryReader />

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ProgressVisualizer 
                      skills={studentStats.skills} 
                      weeklyActivity={studentStats.weekly_activity} 
                      studentName={selectedStudent.name}
                    />
                    
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 pr-2">
                        <Trophy size={28} weight="fill" className="text-yellow-500" />
                        تحليل المهارات
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {studentStats.skills.map((skill, i) => (
                          <div key={i} className="p-6 rounded-[2rem] bg-white border-2 border-border shadow-sm flex flex-col gap-4 group hover:border-primary/20 transition-all">
                            <div className="flex justify-between items-start">
                              <span className="font-black text-xl text-foreground">{skill.category_ar}</span>
                              <BadgeDisplay 
                                earnedBadges={[skill.score > 80 ? "perfect-score" : "first-letter"]} 
                                size="sm" 
                                className="opacity-80 grayscale-[0.5] group-hover:grayscale-0 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                <span>مستوى الإتقان</span>
                                <span>{skill.score}%</span>
                              </div>
                              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.score}%` }}
                                  className="h-full bg-primary rounded-full" 
                                />
                              </div>
                            </div>
                            <p className="text-xs font-bold text-muted-foreground leading-relaxed">تم إكمال {Math.floor(skill.score / 10)} من أصل 10 تمارين بدقة عالية.</p>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               </section>
            )}

            {activeTab === "tutor" && (
              <section className="animate-in fade-in zoom-in-95 duration-500">
                <TutorActionPanel studentName={selectedStudent.name} />
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Badges Dialog */}
        <Dialog open={showBadges} onOpenChange={setShowBadges}>
          <DialogContent className="sm:max-w-[550px] rounded-[3rem] p-8">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-3xl font-black flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-600">
                  <Trophy size={32} weight="fill" />
                </div>
                أوسمة {selectedStudent.name}
              </DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <BadgeList earnedBadges={studentStats.achievements} className="grid-cols-1 sm:grid-cols-2" />
            </div>
            <Button className="w-full h-14 rounded-2xl font-black text-lg mt-4" onClick={() => setShowBadges(false)}>إغلاق النافذة</Button>
          </DialogContent>
        </Dialog>

      </main>
    </div>
  );
}
