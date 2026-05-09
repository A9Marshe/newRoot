"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkle, ArrowLeft, ArrowRight, CheckCircle, Eye, Ear,
  HandTap, PencilSimple, GlobeHemisphereEast, Brain,
  ChartBar, MapPin, Books, Trophy
} from "@phosphor-icons/react";

// ── Activity Types ──────────────────────────────────────────
type ActivityType = "welcome" | "letter_tap" | "listen_pick" | "word_match" | "picture_label" | "sentence_order" | "culture_pick" | "profile";

type Activity = {
  id: string;
  type: ActivityType;
  category: "reading" | "listening" | "writing" | "culture";
  data: any;
};

type ProfileResult = {
  readingLevel: number;
  listeningLevel: number;
  writingLevel: number;
  cultureLevel: number;
  recommendedCity: string;
  personality: string;
  personalityAr: string;
  summary: string;
};

// ── Activity Data ───────────────────────────────────────────
const activities: Activity[] = [
  {
    id: "a1", type: "letter_tap", category: "reading",
    data: {
      prompt: "اضغط على حرف الباء",
      letters: ["أ", "ب", "ت", "ث", "ج"],
      correct: "ب",
    },
  },
  {
    id: "a2", type: "listen_pick", category: "listening",
    data: {
      prompt: "ما الكلمة التي تسمعها؟",
      hint: "🔊 شَمْس",
      options: ["قمر", "شمس", "نجمة", "سماء"],
      correct: "شمس",
    },
  },
  {
    id: "a3", type: "picture_label", category: "writing",
    data: {
      prompt: "ما اسم هذا باللغة العربية؟",
      emoji: "🌊",
      options: ["جبل", "بحر", "نهر", "صحراء"],
      correct: "بحر",
    },
  },
  {
    id: "a4", type: "word_match", category: "reading",
    data: {
      prompt: "صل الكلمة بمعناها",
      pairs: [
        { word: "كتاب", match: "📖" },
        { word: "شجرة", match: "🌳" },
        { word: "بيت", match: "🏠" },
      ],
    },
  },
  {
    id: "a5", type: "sentence_order", category: "writing",
    data: {
      prompt: "رتّب الكلمات لتكوين جملة صحيحة",
      words: ["أحب", "أنا", "العربية", "اللغة"],
      correct: ["أنا", "أحب", "اللغة", "العربية"],
    },
  },
  {
    id: "a6", type: "culture_pick", category: "culture",
    data: {
      prompt: "أين وُلدت أول أبجدية في التاريخ؟",
      options: ["القاهرة", "أوغاريت", "بابل", "أثينا"],
      correct: "أوغاريت",
      fact: "أوغاريت مدينة سورية قديمة على ساحل اللاذقية، اخترعت فيها أول أبجدية عُرفت في التاريخ.",
    },
  },
];

// ── Profile Generator ───────────────────────────────────────
function generateProfile(scores: Record<string, number>): ProfileResult {
  const r = scores.reading ?? 0;
  const l = scores.listening ?? 0;
  const w = scores.writing ?? 0;
  const c = scores.culture ?? 0;
  const total = r + l + w + c;

  let personality = "The Explorer";
  let personalityAr = "المستكشف الفضولي";
  if (c >= 2) { personality = "The Heritage Keeper"; personalityAr = "حارس التراث"; }
  else if (r >= 2) { personality = "The Bookworm"; personalityAr = "عاشق الكتب"; }
  else if (l >= 1 && w >= 1) { personality = "The Communicator"; personalityAr = "المتواصل البارع"; }

  const city = c >= 2 ? "تدمر" : r >= 2 ? "دمشق" : l >= 1 ? "حلب" : "اللاذقية";

  return {
    readingLevel: Math.min(r, 3),
    listeningLevel: Math.min(l, 3),
    writingLevel: Math.min(w, 3),
    cultureLevel: Math.min(c, 3),
    recommendedCity: city,
    personality, personalityAr,
    summary: total >= 4
      ? "مستوى ممتاز! لديك أساس قوي في اللغة العربية. سنبدأ معك من المستوى المتقدم."
      : total >= 2
      ? "بداية رائعة! أنت تعرف الأساسيات. سنبني معاً على ما تعرفه بالفعل."
      : "أهلاً بك في رحلتك الأولى! سنبدأ معاً من البداية خطوة بخطوة.",
  };
}

// ── Main Component ──────────────────────────────────────────
export default function PlacementPage() {
  const router = useRouter();
  const [step, setStep] = useState<"welcome" | "activity" | "profile">("welcome");
  const [actIdx, setActIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ reading: 0, listening: 0, writing: 0, culture: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileResult | null>(null);

  const current = activities[actIdx];
  const progress = step === "activity" ? ((actIdx + 1) / activities.length) * 100 : step === "profile" ? 100 : 0;

  const advance = useCallback(() => {
    if (actIdx < activities.length - 1) {
      setActIdx(i => i + 1);
      setSelected(null);
      setFeedback(null);
      setMatchedPairs([]);
      setOrderedWords([]);
    } else {
      setProfile(generateProfile(scores));
      setStep("profile");
    }
  }, [actIdx, scores]);

  const handlePick = (answer: string, correctAnswer: string, category: string) => {
    setSelected(answer);
    const isCorrect = answer === correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScores(s => ({ ...s, [category]: (s[category] ?? 0) + 1 }));
    setTimeout(advance, 900);
  };

  const handleMatch = (word: string) => {
    if (matchedPairs.includes(word)) return;
    setMatchedPairs(p => [...p, word]);
    setScores(s => ({ ...s, reading: (s.reading ?? 0) + 1 }));
    if (matchedPairs.length + 1 >= current.data.pairs.length) {
      setFeedback("correct");
      setTimeout(advance, 900);
    }
  };

  const handleOrder = (word: string) => {
    const next = [...orderedWords, word];
    setOrderedWords(next);
    if (next.length >= current.data.correct.length) {
      const isCorrect = next.every((w, i) => w === current.data.correct[i]);
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScores(s => ({ ...s, writing: (s.writing ?? 0) + 1 }));
      setTimeout(advance, 1200);
    }
  };

  // ── Welcome Screen ────────────────────────────────────────
  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full text-center space-y-10">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
            <GlobeHemisphereEast size={40} weight="bold" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight">اكتشف مستواك</h1>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              رحلة قصيرة من ٦ أنشطة متنوعة لنتعرف على مهاراتك ونبني لك خطة تعليمية مخصصة بالذكاء الاصطناعي.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-right">
            {[
              { icon: Eye, label: "قراءة" },
              { icon: Ear, label: "استماع" },
              { icon: PencilSimple, label: "كتابة" },
              { icon: MapPin, label: "ثقافة" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <s.icon size={20} weight="duotone" className="text-primary" />
                <span className="text-xs font-black">{s.label}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="h-14 px-12 rounded-xl font-black text-lg gap-3 shadow-xl shadow-primary/10 group" onClick={() => setStep("activity")}>
            هيا نبدأ <ArrowLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── Profile Result Screen ─────────────────────────────────
  if (step === "profile" && profile) {
    const skills = [
      { label: "القراءة", level: profile.readingLevel, icon: Eye },
      { label: "الاستماع", level: profile.listeningLevel, icon: Ear },
      { label: "الكتابة", level: profile.writingLevel, icon: PencilSimple },
      { label: "الثقافة", level: profile.cultureLevel, icon: MapPin },
    ];
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-2xl w-full space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary">
              <Brain size={16} weight="fill" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">تحليل الذكاء الاصطناعي</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">ملفك التعليمي جاهز</h1>
          </div>

          {/* Personality Card */}
          <div className="bg-foreground text-background rounded-[2rem] p-10 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-bl-full opacity-20" />
            <Trophy size={48} weight="fill" className="text-primary mx-auto" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-background/50 mb-2">شخصيتك التعليمية</p>
              <h2 className="text-3xl font-black">{profile.personalityAr}</h2>
              <p className="text-sm font-bold text-background/60 mt-1">{profile.personality}</p>
            </div>
            <p className="text-background/70 font-medium max-w-md mx-auto leading-relaxed">{profile.summary}</p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-6">
            {skills.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-border/50 card-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <s.icon size={20} weight="duotone" className="text-primary" />
                    <span className="font-black text-sm">{s.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{s.level}/3</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(n => (
                    <div key={n} className={cn("h-2 flex-1 rounded-full", n <= s.level ? "bg-primary" : "bg-muted")} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recommended City */}
          <div className="p-6 rounded-2xl border border-border/50 bg-primary/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary"><MapPin size={24} weight="fill" /></div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">المدينة الموصى بها</p>
                <p className="text-xl font-black">{profile.recommendedCity}</p>
              </div>
            </div>
            <Sparkle size={24} className="text-primary" />
          </div>

          <Button size="lg" className="w-full h-14 rounded-xl font-black text-lg shadow-xl shadow-primary/10" onClick={() => router.push("/dashboard")}>
            انطلق في رحلتك التعليمية
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── Activity Screen ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="max-w-3xl mx-auto w-full px-6 pt-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-black text-muted-foreground uppercase tracking-widest">
          <span>النشاط {actIdx + 1} / {activities.length}</span>
          <span className="flex items-center gap-2"><Sparkle size={14} weight="fill" className="text-primary" /> تحديد المستوى</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} className="h-full bg-primary rounded-full" transition={{ duration: 0.4 }} />
        </div>
      </header>

      {/* Activity Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="max-w-xl w-full space-y-10">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", current.category === "reading" ? "bg-primary/10 text-primary" : current.category === "listening" ? "bg-orange-500/10 text-orange-600" : current.category === "culture" ? "bg-secondary/10 text-secondary-foreground" : "bg-green-500/10 text-green-600")}>
                {current.category === "reading" ? <Eye size={20} /> : current.category === "listening" ? <Ear size={20} /> : current.category === "culture" ? <MapPin size={20} /> : <PencilSimple size={20} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {current.category === "reading" ? "قراءة" : current.category === "listening" ? "استماع" : current.category === "culture" ? "ثقافة" : "كتابة"}
              </span>
            </div>

            {/* Prompt */}
            <h2 className="text-3xl font-black tracking-tight leading-snug">{current.data.prompt}</h2>

            {/* Hint for listening */}
            {current.type === "listen_pick" && (
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 text-center">
                <p className="text-4xl">{current.data.hint}</p>
              </div>
            )}

            {/* Emoji for picture_label */}
            {current.type === "picture_label" && (
              <div className="w-32 h-32 rounded-3xl bg-muted/30 border border-border/50 flex items-center justify-center mx-auto">
                <span className="text-6xl">{current.data.emoji}</span>
              </div>
            )}

            {/* Letter Tap */}
            {current.type === "letter_tap" && (
              <div className="flex gap-4 justify-center flex-wrap">
                {current.data.letters.map((l: string) => (
                  <button key={l} disabled={!!feedback} onClick={() => handlePick(l, current.data.correct, current.category)}
                    className={cn("w-20 h-20 rounded-2xl text-3xl font-black border-2 transition-all",
                      selected === l && feedback === "correct" ? "bg-primary text-white border-primary scale-110" :
                      selected === l && feedback === "wrong" ? "bg-destructive text-white border-destructive" :
                      "bg-white border-border hover:border-primary/30 hover:shadow-lg"
                    )}>
                    {l}
                  </button>
                ))}
              </div>
            )}

            {/* MCQ Options (listen_pick, picture_label, culture_pick) */}
            {(current.type === "listen_pick" || current.type === "picture_label" || current.type === "culture_pick") && (
              <div className="grid grid-cols-2 gap-4">
                {current.data.options.map((opt: string) => (
                  <button key={opt} disabled={!!feedback} onClick={() => handlePick(opt, current.data.correct, current.category)}
                    className={cn("p-5 rounded-2xl font-black text-lg border-2 transition-all text-center",
                      selected === opt && feedback === "correct" ? "bg-primary text-white border-primary" :
                      selected === opt && feedback === "wrong" ? "bg-destructive text-white border-destructive" :
                      "bg-white border-border hover:border-primary/30 hover:shadow-lg"
                    )}>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Word Match */}
            {current.type === "word_match" && (
              <div className="space-y-4">
                {current.data.pairs.map((p: any) => (
                  <button key={p.word} disabled={matchedPairs.includes(p.word)} onClick={() => handleMatch(p.word)}
                    className={cn("w-full p-5 rounded-2xl border-2 flex items-center justify-between font-black text-lg transition-all",
                      matchedPairs.includes(p.word) ? "bg-primary/5 border-primary/20 text-primary" : "bg-white border-border hover:border-primary/30"
                    )}>
                    <span>{p.word}</span>
                    <span className="text-2xl">{p.match}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Sentence Order */}
            {current.type === "sentence_order" && (
              <div className="space-y-6">
                <div className="min-h-[60px] p-4 rounded-2xl border-2 border-dashed border-border bg-muted/20 flex gap-3 flex-wrap items-center">
                  {orderedWords.map((w, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-primary text-white font-black text-sm">{w}</span>
                  ))}
                  {orderedWords.length === 0 && <span className="text-muted-foreground text-sm font-medium">اضغط على الكلمات بالترتيب الصحيح...</span>}
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  {current.data.words.map((w: string) => (
                    <button key={w} disabled={orderedWords.includes(w) || !!feedback} onClick={() => handleOrder(w)}
                      className={cn("px-5 py-3 rounded-xl font-black border-2 transition-all",
                        orderedWords.includes(w) ? "opacity-30 border-transparent" : "bg-white border-border hover:border-primary/30 hover:shadow-lg"
                      )}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={cn("p-4 rounded-xl flex items-center gap-3 font-black text-sm",
                    feedback === "correct" ? "bg-primary/5 text-primary border border-primary/10" : "bg-destructive/5 text-destructive border border-destructive/10"
                  )}>
                  {feedback === "correct" ? <CheckCircle size={20} weight="fill" /> : <span>✕</span>}
                  {feedback === "correct" ? "أحسنت! إجابة صحيحة" : "حاول مجدداً في المرة القادمة"}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Culture Fact */}
            {feedback === "correct" && current.type === "culture_pick" && current.data.fact && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-2xl bg-secondary/5 border border-secondary/10 text-sm font-semibold text-foreground/80 leading-relaxed">
                💡 {current.data.fact}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
