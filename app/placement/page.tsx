"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockLessons } from "@/lib/mock";

export default function PlacementPage() {
  const router = useRouter();
  const placementLesson = mockLessons.find((l) => l.level_index === 0);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!placementLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f7f4] dark:bg-[#0a1a14] font-sans">
        <p className="text-xl text-[#4a7c66] dark:text-[#a3d9be]">
          لا يوجد اختبار تحديد مستوى حالياً
        </p>
      </div>
    );
  }

  const exercises = placementLesson.content_json.exercises || [];
  
  if (exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f7f4] dark:bg-[#0a1a14] font-sans">
        <p className="text-xl text-[#4a7c66] dark:text-[#a3d9be]">
          لا توجد تمارين في هذا الاختبار
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
    }

    setTimeout(() => {
      if (currentExIndex < totalExercises - 1) {
        setCurrentExIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Placement complete - mock set level to 1
        alert(`انتهى الاختبار! نتيجتك: ${score}/${totalExercises * 10}. سيتم تحديد مستواك إلى المستوى 1`);
        router.push("/learn");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f0f7f4] dark:bg-[#0a1a14] p-4 sm:p-8 font-sans">
      <main className="max-w-3xl mx-auto flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-bold text-[#1a3c34] dark:text-[#b8e6d0]">
            {placementLesson.title_ar}
          </h1>
          <p className="text-[#4a7c66] dark:text-[#a3d9be]">
            {currentEx ? `تمرين ${currentExIndex + 1} من ${totalExercises}` : ''}
          </p>
        </header>

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

        {currentEx && (
          <div key={currentExIndex}>
            <Card className="border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-[#1a3c34] dark:text-[#b8e6d0]">
                  {currentEx.question_ar}
                </CardTitle>
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

              {isCorrect !== null && (
                <p
                  className={`text-center font-semibold ${
                    isCorrect ? "text-[#2d6a56]" : "text-red-500"
                  }`}
                >
                  {isCorrect ? "إجابة صحيحة! أحسنت" : "إجابة خاطئة"}
                </p>
              )}
            </CardContent>
          </Card>
          </div>
        )}
      </main>
    </div>
  );
}
