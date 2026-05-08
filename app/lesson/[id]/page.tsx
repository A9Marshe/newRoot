"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { mockLessons } from "@/lib/mock";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import confetti from "canvas-confetti";
import { XPAnimation } from "@/components/xp-animation";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const lesson = mockLessons.find((l) => l.id === id);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [failCount, setFailCount] = useState(0);
  const [isAiHelpOpen, setIsAiHelpOpen] = useState(false);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [showXP, setShowXP] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f7f4] dark:bg-[#0a1a14] font-sans">
        <p className="text-xl text-[#4a7c66] dark:text-[#a3d9be]">
          الدرس غير موجود
        </p>
      </div>
    );
  }

  const exercises = lesson.content_json.exercises || [];
  
  if (exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f7f4] dark:bg-[#0a1a14] font-sans">
        <p className="text-xl text-[#4a7c66] dark:text-[#a3d9be]">
          لا توجد تمارين في هذا الدرس
        </p>
      </div>
    );
  }

  const currentEx = exercises[currentExIndex];
  const totalExercises = exercises.length;
  const progress = ((currentExIndex + 1) / totalExercises) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct =
      answer === currentEx.correct_answer ||
      answer === currentEx.correct_answer_ar;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 10);
      setFailCount(0);
      
      // Show XP animation
      setShowXP(true);
      
      // Fire confetti for correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2d6a56', '#8cd4b0', '#d1e7dd', '#fbbf24'],
      });

      // Move to next exercise after delay
      setTimeout(() => {
        if (currentExIndex < totalExercises - 1) {
          setCurrentExIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          // Lesson complete - show celebration dialog
          setIsLessonComplete(true);
          // Big confetti celebration
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#2d6a56', '#8cd4b0', '#d1e7dd', '#fbbf24', '#ec4899'],
          });
        }
      }, 1000);
    } else {
      setFailCount((prev) => prev + 1);
      if (failCount + 1 >= 2) {
        setIsAiHelpOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7f4] dark:bg-[#0a1a14] p-4 sm:p-8 font-sans">
      <main className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-[#1a3c34] dark:text-[#b8e6d0]">
            {lesson.title_ar}
          </h1>
          <p className="text-[#4a7c66] dark:text-[#a3d9be]">
            تمرين {currentExIndex + 1} من {totalExercises}
          </p>
        </header>

        {/* Progress Bar */}
        <div>
          <Progress
            value={progress}
            className="h-3 bg-[#d1e7dd] dark:bg-[#2d6a56]"
          />
          <div className="flex justify-between mt-2 text-sm text-[#4a7c66] dark:text-[#a3d9be]">
            <span>التقدم: {Math.round(progress)}%</span>
            <span>النقاط: {score}</span>
          </div>
        </div>

        {/* Exercise Card */}
        <div key={currentExIndex}>
          <Card className="border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-[#1a3c34] dark:text-[#b8e6d0]">
                  {currentEx.question_ar}
                </CardTitle>
                {currentEx.type === "mcq" ? (
                  <Badge className="bg-[#d1e7dd] text-[#1a3c34] dark:bg-[#2d6a56] dark:text-[#b8e6d0]">
                    اختيار متعدد
                  </Badge>
                ) : (
                  <Badge className="bg-[#ffeaa7] text-[#3d3d00] dark:bg-[#fdcb6e] dark:text-[#1a1a00]">
                    ترتيب
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {currentEx.type === "mcq" && currentEx.options_ar ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentEx.options_ar.map((option) => (
                    <Button
                      key={option}
                      variant={
                        selectedAnswer === option
                          ? isCorrect
                            ? "default"
                            : "destructive"
                          : "outline"
                      }
                      className={`text-lg py-6 ${
                        selectedAnswer === option && isCorrect
                          ? "bg-[#2d6a56] hover:bg-[#1a3c34] text-white"
                          : selectedAnswer === option && !isCorrect
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "border-[#d1e7dd] dark:border-[#2d6a56] text-[#1a3c34] dark:text-[#b8e6d0] hover:bg-[#d1e7dd] dark:hover:bg-[#2d6a56]"
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                    رتب الحروف: {currentEx.correct_answer_ar}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {currentEx.correct_answer_ar.split("، ").map((item) => (
                      <Button
                        key={item}
                        variant="outline"
                        className="border-[#d1e7dd] dark:border-[#2d6a56] text-[#1a3c34] dark:text-[#b8e6d0]"
                        onClick={() => handleAnswer(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {isCorrect !== null && (
                <p
                  className={`text-center font-semibold ${
                    isCorrect ? "text-[#2d6a56]" : "text-red-500"
                  }`}
                >
                  {isCorrect
                    ? "إجابة صحيحة! أحسنت"
                    : "إجابة خاطئة، حاول مرة أخرى"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Help Button */}
        <div className="flex justify-center">
          <Dialog open={isAiHelpOpen} onOpenChange={setIsAiHelpOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#2d6a56] text-[#2d6a56] hover:bg-[#d1e7dd] dark:border-[#8cd4b0] dark:text-[#8cd4b0] dark:hover:bg-[#1a3c34]"
              >
                مساعدة الذكاء الاصطناعي
              </Button>
            </DialogTrigger>
            <DialogContent className="border-[#d1e7dd] dark:border-[#2d6a56]">
              <DialogHeader>
                <DialogTitle className="text-[#1a3c34] dark:text-[#b8e6d0]">
                  شرح المساعد
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                  {currentEx.explanation_ar || "هذه الإجابة غير صحيحة لأن الحرف الأول هو الألف (أ)"}
                </p>
                <Button
                  className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14]"
                  onClick={() => {
                    setIsAiHelpOpen(false);
                    setFailCount(0);
                  }}
                >
                  حسناً
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lesson Complete Dialog */}
        <Dialog open={isLessonComplete} onOpenChange={setIsLessonComplete}>
          <DialogContent className="border-[#d1e7dd] dark:border-[#2d6a56] text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#1a3c34] dark:text-[#b8e6d0]">
                أحسنت! 🎉
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-lg text-[#4a7c66] dark:text-[#a3d9be]">
                لقد أنهيت الدرس بنجاح!
              </p>
              <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                النقاط المكتسبة: {score}
              </p>
              <Button
                className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14]"
                onClick={() => router.push("/learn")}
              >
                العودة إلى مسار التعلم
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* XP Animation */}
        <XPAnimation
          show={showXP}
          xp={10}
          onComplete={() => setShowXP(false)}
        />
      </main>
    </div>
  );
}
