"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockStudents } from "@/lib/mock";
import { useState } from "react";

export default function DashboardPage() {
  const [selectedStudentId, setSelectedStudentId] = useState(mockStudents[0].id);
  const selectedStudent = mockStudents.find((s) => s.id === selectedStudentId);
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f7f4] dark:bg-[#0a1a14] p-4 sm:p-8 font-sans">
      <main className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <header
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <h1 className="text-3xl font-bold text-[#1a3c34] dark:text-[#b8e6d0]">
            لوحة تحكم ولي الأمر
          </h1>
          <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14]">
                إضافة طفل جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="border-[#d1e7dd] dark:border-[#2d6a56]">
              <DialogHeader>
                <DialogTitle className="text-[#1a3c34] dark:text-[#b8e6d0]">
                  إضافة طفل جديد
                </DialogTitle>
              </DialogHeader>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="child-name" className="text-[#1a3c34] dark:text-[#b8e6d0]">
                    اسم الطفل
                  </Label>
                  <Input
                    id="child-name"
                    placeholder="أدخل اسم الطفل"
                    className="border-[#d1e7dd] dark:border-[#2d6a56] focus-visible:ring-[#2d6a56]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="child-age" className="text-[#1a3c34] dark:text-[#b8e6d0]">
                    العمر
                  </Label>
                  <Input
                    id="child-age"
                    type="number"
                    placeholder="أدخل عمر الطفل"
                    className="border-[#d1e7dd] dark:border-[#2d6a56] focus-visible:ring-[#2d6a56]"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14]"
                >
                  حفظ
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* Student Switcher */}
        <section className="flex flex-col gap-2">
          <Label className="text-[#1a3c34] dark:text-[#b8e6d0] font-semibold">
            اختر الطفل
          </Label>
          <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
            <SelectTrigger className="w-full max-w-xs border-[#d1e7dd] dark:border-[#2d6a56] focus:ring-[#2d6a56]">
              <SelectValue placeholder="اختر طفلاً" />
            </SelectTrigger>
            <SelectContent>
              {mockStudents.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} (عمر: {student.age})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* Student Info & Progress */}
        {selectedStudent && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Card */}
            <Card className="border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1a3c34] dark:text-[#b8e6d0]">
                  معلومات الطفل
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                  <span className="font-semibold">الاسم:</span> {selectedStudent.name}
                </p>
                <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                  <span className="font-semibold">العمر:</span> {selectedStudent.age} سنوات
                </p>
                <p className="text-[#4a7c66] dark:text-[#a3d9be]">
                  <span className="font-semibold">المستوى الحالي:</span> {selectedStudent.current_level === 0 ? "اختبار تحديد المستوى" : `المستوى ${selectedStudent.current_level}`}
                </p>
              </CardContent>
            </Card>

            {/* XP Card */}
            <Card className="border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1a3c34] dark:text-[#b8e6d0]">
                  إجمالي النقاط (XP)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-[#2d6a56] dark:text-[#8cd4b0]">
                  {selectedStudent.total_xp}
                </p>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="border-[#d1e7dd] dark:border-[#2d6a56] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#1a3c34] dark:text-[#b8e6d0]">
                  التقدم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-[#d1e7dd] dark:bg-[#2d6a56] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2d6a56] dark:bg-[#8cd4b0] rounded-full"
                    style={{ width: `${selectedStudent.current_level > 0 ? 30 : 0}%` }}
                  />
                </div>
                <p className="text-sm text-[#4a7c66] dark:text-[#a3d9be] mt-2">
                  {selectedStudent.current_level > 0 ? "30% من المستوى الحالي" : "لم يبدأ بعد"}
                </p>
              </CardContent>
              </Card>
            </section>
          )}

        {/* Quick Links */}
        <section className="flex gap-4 flex-wrap">
          <Button
            asChild
            className="bg-[#2d6a56] hover:bg-[#1a3c34] text-white dark:bg-[#8cd4b0] dark:hover:bg-[#b8e6d0] dark:text-[#0a1a14]"
          >
            <a href="/learn">مسار التعلم</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#2d6a56] text-[#2d6a56] hover:bg-[#d1e7dd] dark:border-[#8cd4b0] dark:text-[#8cd4b0] dark:hover:bg-[#1a3c34]"
          >
            <a href="/placement">اختبار تحديد المستوى</a>
          </Button>
        </section>
      </main>
    </div>
  );
}
