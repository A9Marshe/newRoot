"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockLessons, mockStudents, getStudentStats, getLevelTitle } from "@/lib/mock";
import Link from "next/link";

export default function LearnPage() {
  const student = mockStudents[0]; // Use first student for mock
  const studentStats = getStudentStats(student.id);
  const levelInfo = getLevelTitle(student.total_xp);
  const lessonsByLevel = mockLessons.reduce<Record<number, typeof mockLessons>>(
    (acc, lesson) => {
      if (!acc[lesson.level_index]) acc[lesson.level_index] = [];
      acc[lesson.level_index].push(lesson);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-[#f0f7f4] dark:bg-[#0a1a14] p-4 sm:p-8 font-sans">
      <main className="max-w-6xl mx-auto flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold text-[#1a3c34] dark:text-[#b8e6d0]">
            مسار التعلم
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <p className="text-lg text-[#4a7c66] dark:text-[#a3d9be]">
              <span className="font-bold">{student.name}</span> - {levelInfo.title_ar}
            </p>
            <div className="flex items-center gap-2 bg-[#d1e7dd] dark:bg-[#2d6a56] px-3 py-1 rounded-full">
              <span className="text-lg">🔥</span>
              <span className="font-bold text-[#1a3c34] dark:text-[#b8e6d0]">
                {studentStats.streak_days}
              </span>
              <span className="text-sm text-[#4a7c66] dark:text-[#a3d9be]">أيام</span>
            </div>
            <div className="flex items-center gap-2 bg-[#d1e7dd] dark:bg-[#2d6a56] px-3 py-1 rounded-full">
              <span className="text-lg">💎</span>
              <span className="font-bold text-[#1a3c34] dark:text-[#b8e6d0]">
                {student.total_xp}
              </span>
              <span className="text-sm text-[#4a7c66] dark:text-[#a3d9be]">XP</span>
            </div>
          </div>
        </header>

        {/* Level Nodes */}
        <div className="flex flex-col gap-6">
          {Object.entries(lessonsByLevel).map(([levelIndex, lessons]) => {
            const level = Number(levelIndex);
            const isUnlocked = level <= student.current_level;
            const isPlacement = level === 0;

            return (
              <section
                key={level}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-[#1a3c34] dark:text-[#b8e6d0]">
                    {isPlacement ? "اختبار تحديد المستوى" : `المستوى ${level}`}
                  </h2>
                  <Badge
                    className={
                      isUnlocked
                        ? "bg-[#2d6a56] text-white dark:bg-[#8cd4b0] dark:text-[#0a1a14]"
                        : "bg-[#e9ecef] text-[#6c757d] dark:bg-[#2d6a56] dark:text-[#a3d9be]"
                    }
                  >
                    {isUnlocked ? "مفتوح" : "مغلق"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                    >
                      <Card
                        className={`border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm ${
                          isUnlocked ? "hover:shadow-md" : "opacity-70 cursor-not-allowed"
                        }`}
                      >
                        <CardHeader>
                          <CardTitle className="text-[#1a3c34] dark:text-[#b8e6d0]">
                            {lesson.title_ar}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isUnlocked ? (
                            <Button
                              asChild
                              className="w-full bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14]"
                            >
                              <Link href={`/lesson/${lesson.id}`}>ابدأ الدرس</Link>
                            </Button>
                          ) : (
                            <p className="text-[#4a7c66] dark:text-[#a3d9be] text-sm">
                              يجب إكمال المستويات السابقة أولاً
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
