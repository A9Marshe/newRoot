"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { JusoorLogo } from "@/components/ui/jusoor-logo";
import { ArrowLeft, CheckCircle, Eye, Ear, HandTap, PencilSimple, Brain, MapPin, Trophy, Sparkle, ChartBar, Heart, Books, Star, GlobeHemisphereEast } from "@phosphor-icons/react";

type Step = "intro" | "activity" | "analyzing" | "profile";
type Activity = { id: string; type: string; category: string; data: any };

const activities: Activity[] = [
  { id:"a1", type:"letter_tap", category:"reading", data:{ prompt:"اضغط على الحرف الذي يبدأ به اسمك", letters:["ج","ي","ب","ت","م"], correct:"ي", hint:"ياسمين تبدأ بحرف..." }},
  { id:"a2", type:"mcq", category:"listening", data:{ prompt:"استمع للكلمة واختر معناها 🔊 \"الوطن\"", options:["المدرسة","البيت الكبير","الأرض التي نحبها","المدينة"], correct:"الأرض التي نحبها" }},
  { id:"a3", type:"mcq", category:"reading", data:{ prompt:"اقرأ الجملة واختر الكلمة الناقصة: \"سوريا بلد ___ وتاريخ عريق\"", options:["جميل","حضارة","كبير","بعيد"], correct:"حضارة" }},
  { id:"a4", type:"picture_label", category:"vocabulary", data:{ prompt:"ماذا تسمى هذه بالعربية؟", emoji:"🌸", options:["وردة","زهرة الياسمين","شجرة","عشب"], correct:"زهرة الياسمين" }},
  { id:"a5", type:"sentence_order", category:"grammar", data:{ prompt:"رتّب الكلمات لتكوين جملة مفيدة", words:["في","اللاذقية","ولدت","أنا"], correct:["أنا","ولدت","في","اللاذقية"] }},
  { id:"a6", type:"mcq", category:"culture", data:{ prompt:"ما اسم المملكة السورية القديمة التي اخترعت أول أبجدية؟", options:["بابل","أوغاريت","كنعان","آشور"], correct:"أوغاريت", fact:"أوغاريت مدينة على ساحل اللاذقية، اخترعت فيها أول أبجدية حوالي 1400 ق.م" }},
  { id:"a7", type:"mcq", category:"comprehension", data:{ prompt:"\"البحر صديق أهل الساحل\" — ما المقصود بهذه الجملة؟", options:["الناس يسبحون كثيراً","البحر يوفر الرزق والفرح لسكان الساحل","البحر خطير","الأسماك كثيرة"], correct:"البحر يوفر الرزق والفرح لسكان الساحل" }},
  { id:"a8", type:"mcq", category:"expression", data:{ prompt:"كيف تعبّر عن شوقك لسوريا بجملة جميلة؟", options:["أريد أن أسافر","قلبي يحن إلى أرض الياسمين","سوريا بعيدة","لا أعرف"], correct:"قلبي يحن إلى أرض الياسمين" }},
];

type Profile = {
  name: string; age: number; country: string; languages: string[]; hometown: string;
  reading: number; listening: number; grammar: number; vocabulary: number;
  comprehension: number; culture: number; expression: number;
  personality: string; personalityAr: string; city: string;
  dialect: string; learningStyle: string; emotionalConnection: string;
  recommendedLevel: string; summary: string;
  strengths: string[]; growthAreas: string[];
  bilingualAdvantage: string; scriptFamiliarity: string;
  culturalDistance: string; integrationContext: string;
};

const langMap: Record<string,{script:string;advantage:string}> = {
  "الألمانية":{script:"لاتيني — ستتعلم الكتابة من اليمين لليسار كمهارة جديدة",advantage:"التفكير المنظم من الألمانية سيساعدك في القواعد العربية"},
  "الإنجليزية":{script:"لاتيني — ستحتاج تدريباً على اتجاه الكتابة العربية",advantage:"حصيلتك اللغوية الواسعة ستسرّع تعلم المفردات"},
  "التركية":{script:"لاتيني — لكن لديك ميزة القرب الثقافي والمفردات المشتركة",advantage:"كلمات كثيرة مشتركة بين التركية والعربية ستسهل رحلتك"},
  "الفرنسية":{script:"لاتيني — ستكتشف جمال الخط العربي كفن جديد",advantage:"الفرنسية علمتك التذوق اللغوي الذي سيثري تعبيرك بالعربية"},
};

const countryMap: Record<string,{distance:string;context:string}> = {
  "ألمانيا":{distance:"بعد جغرافي كبير — لذلك RootBridge سيكون جسرك اليومي نحو سوريا",context:"مجتمع سوري نشط في ألمانيا، ستجد رفاقاً في الرحلة"},
  "تركيا":{distance:"قرب جغرافي وثقافي — الكثير من المفردات والعادات مشتركة",context:"القرب من سوريا يعني فرصاً أكبر للتواصل المباشر مع الجذور"},
  "السويد":{distance:"بعد جغرافي مع مجتمع سوري دافئ في الشمال",context:"ستتعلم العربية بينما تحافظ على تميزك الثقافي في السويد"},
  "كندا":{distance:"عبر المحيط — لكن التكنولوجيا تقرّب المسافات",context:"مجتمع عربي متنوع في كندا سيدعم رحلتك"},
};

function generateProfile(name: string, age: number, scores: Record<string,number>, country: string, languages: string[], hometown: string): Profile {
  const r = scores.reading||0, l = scores.listening||0, g = scores.grammar||0;
  const v = scores.vocabulary||0, comp = scores.comprehension||0, cu = scores.culture||0, ex = scores.expression||0;
  const total = r+l+g+v+comp+cu+ex;

  let personality="المستكشف", personalityAr="المستكشف الفضولي";
  if(cu>=1&&comp>=1){personality="Heritage Guardian";personalityAr="حارس التراث";}
  else if(ex>=1&&comp>=1){personality="The Poet";personalityAr="الشاعر المبدع";}
  else if(r>=1&&g>=1){personality="The Scholar";personalityAr="العالم الصغير";}
  else if(v>=1&&l>=1){personality="The Listener";personalityAr="المستمع اليقظ";}

  const city = hometown?`${hometown} — مدينتك الأصلية`:cu>=1?"اللاذقية — أوغاريت":comp>=1?"دمشق — قلب الشام":"حلب — مدينة العلم";
  const dialect = ex>=1?"لديك حس لغوي طبيعي بالتعبير العامي والفصيح":"ستتعلم التمييز بين الفصحى والعامية السورية";
  const learningStyle = comp>=1&&ex>=1?"تعلم تفاعلي عبر القصص والحوار":g>=1?"تعلم منظم مع قواعد واضحة":"تعلم بصري مع صور وأنشطة عملية";
  const emotionalConnection = ex>=1?"ارتباط عاطفي قوي بالهوية السورية":cu>=1?"فضول ثقافي عميق تجاه التراث":"بداية واعدة لبناء جسر مع الجذور";
  const recommendedLevel = total>=6?"متوسط متقدم":total>=3?"متوسط":"مبتدئ متحمس";

  const mainLang = languages[0] || "الإنجليزية";
  const langInfo = langMap[mainLang] || langMap["الإنجليزية"];
  const countryInfo = countryMap[country] || {distance:"تجربة فريدة في المغترب — RootBridge سيكون رفيقك",context:"أينما كنت، الهوية السورية تسافر معك"};
  const bilingualAdvantage = languages.length>=2
    ? `ثنائي اللغة (${languages.join(" + ")}) — دماغك مهيأ لتعلم لغة ثالثة بسرعة مضاعفة!`
    : `تتحدث ${mainLang} — ${langInfo.advantage}`;

  const strengths: string[] = [];
  const growth: string[] = [];
  if(r>=1) strengths.push("التعرف على الحروف والقراءة"); else growth.push("القراءة الأساسية");
  if(l>=1) strengths.push("فهم الكلمات المسموعة"); else growth.push("مهارات الاستماع");
  if(g>=1) strengths.push("ترتيب الجمل والقواعد"); else growth.push("بناء الجمل");
  if(v>=1) strengths.push("المفردات والمعاني"); else growth.push("توسيع المفردات");
  if(comp>=1) strengths.push("الفهم والاستنتاج"); else growth.push("الفهم العميق");
  if(cu>=1) strengths.push("المعرفة الثقافية السورية"); else growth.push("اكتشاف التراث");
  if(ex>=1) strengths.push("التعبير العاطفي"); else growth.push("التعبير الشخصي");

  return {
    name,age,country,languages,hometown,
    reading:r,listening:l,grammar:g,vocabulary:v,comprehension:comp,culture:cu,expression:ex,
    personality,personalityAr,city,dialect,learningStyle,emotionalConnection,recommendedLevel,
    bilingualAdvantage, scriptFamiliarity:langInfo.script,
    culturalDistance:countryInfo.distance, integrationContext:countryInfo.context,
    summary:`مرحباً ${name}! أنت "${personalityAr}" قادمة من ${country}. مستواك "${recommendedLevel}". ${emotionalConnection}. سنبدأ رحلتك من ${city}.`,
    strengths, growthAreas: growth,
  };
}

export default function PlacementPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [name, setName] = useState(""); const [age, setAge] = useState("14"); const [hometown, setHometown] = useState("");
  const [country, setCountry] = useState(""); const [knownLangs, setKnownLangs] = useState<string[]>([]);
  const [actIdx, setActIdx] = useState(0);
  const [scores, setScores] = useState<Record<string,number>>({});
  const [selected, setSelected] = useState<string|null>(null);
  const [feedback, setFeedback] = useState<"correct"|"wrong"|null>(null);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [profile, setProfile] = useState<Profile|null>(null);

  const current = activities[actIdx];
  const progress = step==="activity"?((actIdx+1)/activities.length)*100:step==="profile"?100:0;

  const advance = () => {
    if(actIdx<activities.length-1){setActIdx(i=>i+1);setSelected(null);setFeedback(null);setOrderedWords([]);}
    else{setStep("analyzing");setTimeout(()=>{setProfile(generateProfile(name||"ياسمين",parseInt(age)||14,scores,country||"ألمانيا",knownLangs.length?knownLangs:["الألمانية"],hometown||"اللاذقية"));setStep("profile");},2500);}
  };
  const pick = (ans:string,correct:string,cat:string) => {
    setSelected(ans);const ok=ans===correct;setFeedback(ok?"correct":"wrong");
    if(ok)setScores(s=>({...s,[cat]:(s[cat]||0)+1}));setTimeout(advance,900);
  };
  const order = (w:string) => {
    const next=[...orderedWords,w];setOrderedWords(next);
    if(next.length>=current.data.correct.length){
      const ok=next.every((x,i)=>x===current.data.correct[i]);
      setFeedback(ok?"correct":"wrong");if(ok)setScores(s=>({...s,grammar:(s.grammar||0)+1}));setTimeout(advance,1200);
    }
  };

  // ── INTRO ─────────────────────
  if(step==="intro") return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="max-w-md w-full space-y-10">
        <div className="text-center space-y-4">
          <JusoorLogo className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-black tracking-tight">مرحباً بك في جسور</h1>
          <p className="text-muted-foreground font-medium leading-relaxed">أخبرنا عنك قليلاً حتى نصمم لك رحلة تعليمية فريدة</p>
        </div>
        <div className="space-y-5">
          <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">الاسم</Label>
            <Input value={name} onChange={e=>setName(e.target.value)} placeholder="ياسمين" className="h-12 rounded-xl"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">العمر</Label>
              <Input type="number" value={age} onChange={e=>setAge(e.target.value)} placeholder="14" className="h-12 rounded-xl"/></div>
            <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">المدينة الأصلية في سوريا</Label>
              <Input value={hometown} onChange={e=>setHometown(e.target.value)} placeholder="اللاذقية" className="h-12 rounded-xl"/></div>
          </div>
          <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">بلد الإقامة الحالي</Label>
            <div className="grid grid-cols-4 gap-2">
              {["ألمانيا","تركيا","السويد","كندا"].map(c=>(
                <button key={c} onClick={()=>setCountry(c)} className={cn("p-3 rounded-xl border-2 font-black text-xs transition-all",country===c?"bg-primary text-white border-primary":"bg-white border-border hover:border-primary/30")}>{c}</button>
              ))}
            </div>
            {!["ألمانيا","تركيا","السويد","كندا"].includes(country) && (
              <Input value={country} onChange={e=>setCountry(e.target.value)} placeholder="أو اكتب البلد..." className="h-10 rounded-xl text-sm mt-2"/>
            )}
          </div>
          <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">اللغات التي تتحدثها</Label>
            <div className="flex flex-wrap gap-2">
              {["الألمانية","الإنجليزية","التركية","الفرنسية"].map(lang=>(
                <button key={lang} onClick={()=>setKnownLangs(prev=>prev.includes(lang)?prev.filter(l=>l!==lang):[...prev,lang])}
                  className={cn("px-4 py-2.5 rounded-xl border-2 font-black text-xs transition-all",knownLangs.includes(lang)?"bg-primary text-white border-primary":"bg-white border-border hover:border-primary/30")}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">٨ أنشطة متنوعة • ٣ دقائق</p>
          <Button size="lg" className="w-full h-14 rounded-xl font-black text-lg gap-3 shadow-xl shadow-primary/10 group"
            onClick={()=>{if(name.trim())setStep("activity");}}>
            ابدأ الاكتشاف <ArrowLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform"/>
          </Button>
        </div>
      </motion.div>
    </div>
  );

  // ── ANALYZING ─────────────────
  if(step==="analyzing") return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center space-y-8">
        <motion.div animate={{rotate:360}} transition={{duration:2,repeat:Infinity,ease:"linear"}}
          className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary mx-auto"/>
        <div className="space-y-3">
          <h2 className="text-2xl font-black">الذكاء الاصطناعي يحلل إجاباتك...</h2>
          <p className="text-muted-foreground font-medium">نبني ملفك التعليمي المخصص</p>
        </div>
      </motion.div>
    </div>
  );

  // ── PROFILE ───────────────────
  if(step==="profile"&&profile) {
    const axes = [
      {label:"القراءة",val:profile.reading,icon:Eye,max:1},
      {label:"الاستماع",val:profile.listening,icon:Ear,max:1},
      {label:"القواعد",val:profile.grammar,icon:PencilSimple,max:1},
      {label:"المفردات",val:profile.vocabulary,icon:Books,max:1},
      {label:"الفهم",val:profile.comprehension,icon:Brain,max:1},
      {label:"الثقافة",val:profile.culture,icon:MapPin,max:1},
      {label:"التعبير",val:profile.expression,icon:Heart,max:1},
    ];
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.6}} className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary">
              <Brain size={16} weight="fill"/><span className="text-[10px] font-black uppercase tracking-[0.2em]">تحليل AI مخصص</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">ملف {profile.name} التعليمي</h1>
          </div>

          {/* Personality */}
          <div className="bg-foreground text-background rounded-[2rem] p-8 text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full opacity-20"/>
            <Trophy size={40} weight="fill" className="text-primary mx-auto"/>
            <p className="text-[10px] font-black uppercase tracking-widest text-background/50">شخصيتك التعليمية</p>
            <h2 className="text-3xl font-black">{profile.personalityAr}</h2>
            <p className="text-xs font-bold text-background/50">{profile.personality}</p>
            <p className="text-background/70 font-medium text-sm max-w-md mx-auto leading-relaxed">{profile.summary}</p>
          </div>

          {/* 7-Axis Skills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {axes.map((a,i)=>(
              <div key={i} className="p-4 rounded-2xl bg-white border border-border/50 card-shadow text-center space-y-3">
                <a.icon size={20} weight="duotone" className="text-primary mx-auto"/>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{a.label}</p>
                <div className="flex gap-1 justify-center">{[1].map(n=>(
                  <div key={n} className={cn("h-2 w-full rounded-full",a.val>=n?"bg-primary":"bg-muted")}/>
                ))}</div>
              </div>
            ))}
          </div>

          {/* Inferred Anchor Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {label:"المستوى الموصى",value:profile.recommendedLevel,icon:ChartBar},
              {label:"المدينة الأولى",value:profile.city.split("—")[0],icon:MapPin},
              {label:"أسلوب التعلم",value:profile.learningStyle,icon:Star},
              {label:"الارتباط العاطفي",value:profile.emotionalConnection,icon:Heart},
              {label:"الميزة اللغوية",value:profile.bilingualAdvantage,icon:Books},
              {label:"نظام الكتابة",value:profile.scriptFamiliarity,icon:PencilSimple},
              {label:"البعد الجغرافي",value:profile.culturalDistance,icon:GlobeHemisphereEast},
              {label:"سياق الاندماج",value:profile.integrationContext,icon:Brain},
            ].map((item,i)=>(
              <div key={i} className="p-5 rounded-2xl border border-border/50 bg-white card-shadow flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/5 text-primary shrink-0"><item.icon size={20} weight="duotone"/></div>
                <div><p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="font-bold text-sm leading-relaxed">{item.value}</p></div>
              </div>
            ))}
          </div>

          {/* Strengths & Growth */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-primary/10 bg-primary/[0.03] space-y-3">
              <p className="text-[9px] font-black text-primary uppercase tracking-widest">نقاط القوة</p>
              {profile.strengths.map((s,i)=><p key={i} className="text-xs font-bold flex items-center gap-2"><CheckCircle size={14} weight="fill" className="text-primary"/>{s}</p>)}
            </div>
            <div className="p-5 rounded-2xl border border-secondary/10 bg-secondary/[0.03] space-y-3">
              <p className="text-[9px] font-black text-secondary-foreground uppercase tracking-widest">مجالات النمو</p>
              {profile.growthAreas.map((s,i)=><p key={i} className="text-xs font-bold flex items-center gap-2"><Sparkle size={14} weight="fill" className="text-secondary-foreground"/>{s}</p>)}
            </div>
          </div>

          {/* Dialect & Context note */}
          <div className="p-5 rounded-xl bg-muted/30 border border-border/50 space-y-2 text-center">
            <p className="text-xs font-bold text-muted-foreground">{profile.dialect}</p>
            <p className="text-[10px] font-semibold text-muted-foreground/70">
              {profile.name}، عمرك {profile.age} سنة • من {profile.hometown || "سوريا"} • تقيم في {profile.country}
            </p>
          </div>

          <Button size="lg" className="w-full h-14 rounded-xl font-black text-lg shadow-xl shadow-primary/10"
            onClick={()=>router.push("/dashboard")}>
            انطلق في رحلتك التعليمية
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── ACTIVITY ──────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="max-w-3xl mx-auto w-full px-6 pt-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-black text-muted-foreground uppercase tracking-widest">
          <span>{actIdx+1} / {activities.length}</span>
          <span className="flex items-center gap-2"><Sparkle size={14} weight="fill" className="text-primary"/>تحديد المستوى</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div animate={{width:`${progress}%`}} className="h-full bg-primary rounded-full" transition={{duration:0.4}}/>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="max-w-xl w-full space-y-8">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg",
                current.category==="reading"?"bg-primary/10 text-primary":
                current.category==="listening"?"bg-orange-500/10 text-orange-600":
                current.category==="culture"?"bg-secondary/10 text-secondary-foreground":
                "bg-green-500/10 text-green-600")}>
                {current.category==="reading"?<Eye size={20}/>:current.category==="listening"?<Ear size={20}/>:
                current.category==="culture"?<MapPin size={20}/>:<PencilSimple size={20}/>}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {({reading:"قراءة",listening:"استماع",grammar:"قواعد",vocabulary:"مفردات",comprehension:"فهم",culture:"ثقافة",expression:"تعبير"} as any)[current.category]||current.category}
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-snug">{current.data.prompt}</h2>

            {current.data.hint && current.type!=="letter_tap" && (
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/50 text-center text-xl font-bold">{current.data.hint}</div>
            )}
            {current.type==="picture_label" && (
              <div className="w-28 h-28 rounded-3xl bg-muted/30 border border-border/50 flex items-center justify-center mx-auto"><span className="text-5xl">{current.data.emoji}</span></div>
            )}
            {current.type==="letter_tap" && (
              <div>
                {current.data.hint && <p className="text-sm text-muted-foreground font-semibold mb-4 text-center">{current.data.hint}</p>}
                <div className="flex gap-4 justify-center flex-wrap">
                  {current.data.letters.map((l:string)=>(
                    <button key={l} disabled={!!feedback} onClick={()=>pick(l,current.data.correct,current.category)}
                      className={cn("w-20 h-20 rounded-2xl text-3xl font-black border-2 transition-all",
                        selected===l&&feedback==="correct"?"bg-primary text-white border-primary scale-110":
                        selected===l&&feedback==="wrong"?"bg-destructive text-white border-destructive":
                        "bg-white border-border hover:border-primary/30 hover:shadow-lg")}>{l}</button>
                  ))}
                </div>
              </div>
            )}
            {(current.type==="mcq"||current.type==="picture_label") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.data.options.map((o:string)=>(
                  <button key={o} disabled={!!feedback} onClick={()=>pick(o,current.data.correct,current.category)}
                    className={cn("p-4 rounded-2xl font-black border-2 transition-all text-right",
                      selected===o&&feedback==="correct"?"bg-primary text-white border-primary":
                      selected===o&&feedback==="wrong"?"bg-destructive text-white border-destructive":
                      "bg-white border-border hover:border-primary/30 hover:shadow-lg")}>{o}</button>
                ))}
              </div>
            )}
            {current.type==="sentence_order" && (
              <div className="space-y-5">
                <div className="min-h-[56px] p-4 rounded-2xl border-2 border-dashed border-border bg-muted/20 flex gap-2 flex-wrap items-center">
                  {orderedWords.map((w,i)=>(<span key={i} className="px-3 py-1.5 rounded-lg bg-primary text-white font-black text-sm">{w}</span>))}
                  {orderedWords.length===0&&<span className="text-muted-foreground text-xs font-medium">اضغط على الكلمات بالترتيب...</span>}
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  {current.data.words.map((w:string)=>(
                    <button key={w} disabled={orderedWords.includes(w)||!!feedback} onClick={()=>order(w)}
                      className={cn("px-4 py-2.5 rounded-xl font-black border-2 transition-all text-sm",
                        orderedWords.includes(w)?"opacity-30 border-transparent":"bg-white border-border hover:border-primary/30 hover:shadow-lg")}>{w}</button>
                  ))}
                </div>
              </div>
            )}
            <AnimatePresence>
              {feedback&&(
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className={cn("p-4 rounded-xl flex items-center gap-3 font-black text-sm",
                    feedback==="correct"?"bg-primary/5 text-primary border border-primary/10":"bg-destructive/5 text-destructive border border-destructive/10")}>
                  {feedback==="correct"?<CheckCircle size={20} weight="fill"/>:<span>✕</span>}
                  {feedback==="correct"?"أحسنت!":"لا بأس، سنعمل على هذا معاً"}
                </motion.div>
              )}
            </AnimatePresence>
            {feedback==="correct"&&current.data.fact&&(
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 text-xs font-semibold leading-relaxed">
                💡 {current.data.fact}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
