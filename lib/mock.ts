export type Profile = {
  id: string;
  display_name: string;
  email: string;
  role: "parent" | "admin";
  created_at: Date;
};

export type Student = {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  current_level: number;
  total_xp: number;
  avatar_url: string | null;
  created_at: Date;
};

export type Lesson = {
  id: string;
  level_index: number;
  title: string;
  title_ar: string;
  content_json: {
    exercises: Exercise[];
  };
  order_index: number;
  created_at: Date;
};

export type Exercise = {
  id: string;
  type: "mcq" | "sorting";
  question: string;
  question_ar: string;
  options?: string[];
  options_ar?: string[];
  correct_answer: string;
  correct_answer_ar: string;
  explanation?: string;
  explanation_ar?: string;
};

export type StudentProgress = {
  id: string;
  student_id: string;
  lesson_id: string;
  score: number;
  completed_at: Date;
};

export type Achievement = {
  id: string;
  title: string;
  title_ar: string;
  icon: string;
  description: string;
  description_ar: string;
  condition: (stats: StudentStats) => boolean;
};

export type SkillStrength = {
  category: string;
  category_ar: string;
  score: number; // 0-100
};

export type DailyActivity = {
  day: string;
  day_ar: string;
  xp: number;
};

export type SyrianCity = {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  unlocked: boolean;
  landmark: string;
};

export type StudentStats = {
  student_id: string;
  streak_days: number;
  last_activity_date: string | null;
  achievements: string[];
  level_title: string;
  level_title_ar: string;
  skills: SkillStrength[];
  weekly_activity: DailyActivity[];
  discovered_cities: string[];
};

export type Story = {
  id: string;
  title: string;
  title_ar: string;
  content: string;
  content_ar: string;
  category: "history" | "legend" | "culture";
  imageUrl: string;
  location: string;
};

export const levelTitles = [
  { minXP: 0, title: "مبتدئ", title_ar: "مبتدئ" },
  { minXP: 100, title: "متميز", title_ar: "متميز" },
  { minXP: 300, title: "نجم", title_ar: "نجم" },
  { minXP: 600, title: "بطل", title_ar: "بطل" },
  { minXP: 1000, title: "أستاذ", title_ar: "أستاذ" },
];

export const getLevelTitle = (xp: number): { title: string; title_ar: string } => {
  for (let i = levelTitles.length - 1; i >= 0; i--) {
    if (xp >= levelTitles[i].minXP) {
      return { title: levelTitles[i].title, title_ar: levelTitles[i].title_ar };
    }
  }
  return { title: "مبتدئ", title_ar: "مبتدئ" };
};

export const allAchievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "First Lesson",
    title_ar: "أول درس",
    icon: "🌟",
    description: "Complete your first lesson",
    description_ar: "أكمل أول درس لك",
    condition: (stats) => stats.achievements.length >= 1,
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    title_ar: "النتيجة المثالية",
    icon: "🎯",
    description: "Score 100% on any lesson",
    description_ar: "حصل على 100% في أي درس",
    condition: () => false,
  },
  {
    id: "streak-3",
    title: "3-Day Streak",
    title_ar: "ثلاثة أيام متتالية",
    icon: "🔥",
    description: "Learn for 3 consecutive days",
    description_ar: "تعلم لمدة 3 أيام متتالية",
    condition: (stats) => stats.streak_days >= 3,
  },
  {
    id: "streak-7",
    title: "Week Champion",
    title_ar: "بطل الأسبوع",
    icon: "⭐",
    description: "Learn for 7 consecutive days",
    description_ar: "تعلم لمدة 7 أيام متتالية",
    condition: (stats) => stats.streak_days >= 7,
  },
  {
    id: "complete-level1",
    title: "Level Master",
    title_ar: "سيد المستوى",
    icon: "👑",
    description: "Complete all Level 1 lessons",
    description_ar: "أكمل جميع دروس المستوى الأول",
    condition: () => false,
  },
  {
    id: "xp-100",
    title: "XP Collector",
    title_ar: "جامع النقاط",
    icon: "💎",
    description: "Earn 100 XP",
    description_ar: "اجماع 100 نقطة",
    condition: (stats) => stats.achievements.length >= 3,
  },
  {
    id: "xp-500",
    title: "XP Master",
    title_ar: "أستاذ النقاط",
    icon: "🏆",
    description: "Earn 500 XP",
    description_ar: "اجماع 500 نقطة",
    condition: (stats) => stats.achievements.length >= 5,
  },
  {
    id: "first-letter",
    title: "Letter Explorer",
    title_ar: "مستكشف الحروف",
    icon: "🔤",
    description: "Learn your first Arabic letter",
    description_ar: "تعلم أول حرف عربي",
    condition: (stats) => stats.achievements.length >= 2,
  },
  {
    id: "jasmine-explorer",
    title: "Jasmine Explorer",
    title_ar: "مستكشف الياسمين",
    icon: "🌼",
    description: "Discover Damascus",
    description_ar: "اكتشف مدينة دمشق",
    condition: (stats) => stats.discovered_cities.includes("damascus"),
  },
];

export const syrianCities: SyrianCity[] = [
  {
    id: "damascus",
    name: "Damascus",
    name_ar: "دمشق",
    description: "The city of Jasmine and the oldest inhabited capital in the world.",
    description_ar: "مدينة الياسمين وأقدم عاصمة مأهولة في العالم.",
    unlocked: true,
    landmark: "الجامع الأموي",
  },
  {
    id: "aleppo",
    name: "Aleppo",
    name_ar: "حلب",
    description: "Famous for its ancient citadel and vibrant souks.",
    description_ar: "مشهورة بقلعتها الأثرية وأسواقها النابضة بالحياة.",
    unlocked: true,
    landmark: "قلعة حلب",
  },
  {
    id: "homs",
    name: "Homs",
    name_ar: "حمص",
    description: "Known for the Khalid ibn al-Walid Mosque and its central location.",
    description_ar: "معروفة بجامع خالد بن الوليد وموقعها المركزي.",
    unlocked: false,
    landmark: "جامع خالد بن الوليد",
  },
  {
    id: "latakia",
    name: "Latakia",
    name_ar: "اللاذقية",
    description: "Syria's main port city on the Mediterranean coast.",
    description_ar: "عروس الساحل وأرض الأبجدية الأولى.",
    unlocked: true,
    landmark: "أوغاريت",
  },
];

export const latakiaStories: Story[] = [
  {
    id: "ugarit-alphabet",
    title: "The First Alphabet",
    title_ar: "قصة الأبجدية الأولى",
    category: "history",
    location: "أوغاريت",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop",
    content: "Ugarit, an ancient city in Latakia, is where the world's first alphabet was born...",
    content_ar: "في قديم الزمان، وعلى شواطئ مدينة اللاذقية الجميلة، وتحديداً في مملكة أوغاريت، اجتمع الحكماء لاختراع طريقة جديدة للتواصل. بدلاً من الرسوم المعقدة، ابتكروا حروفاً صغيرة وسهلة، لتكون أول أبجدية في تاريخ البشرية. واليوم، كل حرف تكتبه هو حفيد لتلك الحروف التي ولدت في أوغاريت.",
  },
  {
    id: "latakia-port",
    title: "The Friendly Sea",
    title_ar: "البحر الصديق وميناء الأمان",
    category: "culture",
    location: "ميناء اللاذقية",
    imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&auto=format&fit=crop",
    content: "The sea has always been a friend to the people of Latakia, bringing treasures and stories from far away...",
    content_ar: "منذ آلاف السنين، وأهالي اللاذقية ينظرون إلى البحر كصديق وفي. يحكي الأجداد كيف كانت السفن الخشبية تعود محملة بالحرير والتوابل والقصص من بلاد بعيدة. الميناء لم يكن مجرد مكان للسفن، بل كان ملتقى للثقافات، حيث يتعلم الجميع لغات بعضهم البعض بابتسامة ومحبة.",
  },
  {
    id: "roman-arch",
    title: "The Arch of Triumph",
    title_ar: "قوس النصر التاريخي",
    category: "history",
    location: "حي الصليبة",
    imageUrl: "https://images.unsplash.com/photo-1590001158193-7904d1ef417a?w=800&auto=format&fit=crop",
    content: "In the heart of Latakia stands a grand Roman arch, a gate to the past...",
    content_ar: "في قلب مدينة اللاذقية القديمة، يقف 'قوس النصر' شامخاً منذ العصر الروماني. يروي القوس قصص المهرجانات الكبيرة التي كانت تقام في ساحاته، وكيف كان الأطفال يركضون حول أعمدته الضخمة، واليوم يظل القوس شاهداً على عظمة مدينتنا وجمال تاريخها الذي لا ينسى.",
  },
];

// Mock parent profile
export const mockProfile: Profile = {
  id: "parent-1",
  display_name: "أحمد الخطيب",
  email: "ahmad@example.com",
  role: "parent",
  created_at: new Date("2026-01-01"),
};

// Mock students
export const mockStudents: Student[] = [
  {
    id: "student-1",
    parent_id: "parent-1",
    name: "ياسمين",
    age: 7,
    current_level: 1,
    total_xp: 450,
    avatar_url: null,
    created_at: new Date("2026-01-02"),
  },
  {
    id: "student-2",
    parent_id: "parent-1",
    name: "عمر",
    age: 5,
    current_level: 0, // Placement test pending
    total_xp: 0,
    avatar_url: null,
    created_at: new Date("2026-01-03"),
  },
];

// Mock lessons (Placement + Level 1: Letters + Level 2: Harakat)
export const mockLessons: Lesson[] = [
  // Placement test (level 0)
  {
    id: "lesson-placement-1",
    level_index: 0,
    title: "Arabic Alphabet Placement",
    title_ar: "اختبار تحديد المستوى - الحروف",
    content_json: {
      exercises: [
        {
          id: "ex-1",
          type: "mcq",
          question: "What is the first letter of the Arabic alphabet?",
          question_ar: "ما هي الحرف الأول في الأبجدية العربية؟",
          options: ["ب", "أ", "ت", "ث"],
          options_ar: ["ب", "أ", "ت", "ث"],
          correct_answer: "أ",
          correct_answer_ar: "أ",
          explanation: "The first letter is Alif (أ)",
          explanation_ar: "الحرف الأول هو الألف (أ)",
        },
        {
          id: "ex-2",
          type: "sorting",
          question: "Sort these letters in correct order: ب، أ، ت",
          question_ar: "رتب الحروف التالية بشكل صحيح: ب، أ، ت",
          correct_answer: "أ، ب، ت",
          correct_answer_ar: "أ، ب، ت",
          explanation: "Correct order is Alif, Ba, Ta",
          explanation_ar: "الترتيب الصحيح هو ألف، باء، تاء",
        },
        {
          id: "ex-3",
          type: "mcq",
          question: "Which letter comes after Alif?",
          question_ar: "أي حرف يأتي بعد الألف؟",
          options: ["أ", "ب", "ت", "ث"],
          options_ar: ["أ", "ب", "ت", "ث"],
          correct_answer: "ب",
          correct_answer_ar: "ب",
        },
      ],
    },
    order_index: 1,
    created_at: new Date("2026-01-01"),
  },
  // Level 1: Letters (6 lessons)
  {
    id: "lesson-1-1",
    level_index: 1,
    title: "Letter Alif (أ)",
    title_ar: "الحرف الأول - الألف (أ)",
    content_json: {
      exercises: [
        {
          id: "ex-1-1",
          type: "mcq",
          question: "Identify the letter Alif (أ)",
          question_ar: "حدد الحرف الألف (أ)",
          options: ["أ", "ب", "ت", "ث"],
          options_ar: ["أ", "ب", "ت", "ث"],
          correct_answer: "أ",
          correct_answer_ar: "أ",
        },
        {
          id: "ex-1-2",
          type: "sorting",
          question: "Sort: أ، ب، ت",
          question_ar: "رتب: أ، ب، ت",
          correct_answer: "أ، ب، ت",
          correct_answer_ar: "أ، ب، ت",
        },
      ],
    },
    order_index: 1,
    created_at: new Date("2026-01-01"),
  },
  {
    id: "lesson-1-2",
    level_index: 1,
    title: "Letter Ba (ب)",
    title_ar: "الحرف الثاني - الباء (ب)",
    content_json: {
      exercises: [
        {
          id: "ex-2-1",
          type: "mcq",
          question: "Identify the letter Ba (ب)",
          question_ar: "حدد الحرف الباء (ب)",
          options: ["أ", "ب", "ت", "ث"],
          options_ar: ["أ", "ب", "ت", "ث"],
          correct_answer: "ب",
          correct_answer_ar: "ب",
        },
        {
          id: "ex-2-2",
          type: "mcq",
          question: "What is the sound of Ba?",
          question_ar: "ما هو صوت الباء؟",
          options: ["ت", "ب", "ث", "أ"],
          options_ar: ["ت", "ب", "ث", "أ"],
          correct_answer: "ب",
          correct_answer_ar: "ب",
        },
      ],
    },
    order_index: 2,
    created_at: new Date("2026-01-01"),
  },
  {
    id: "lesson-1-3",
    level_index: 1,
    title: "Letter Ta (ت)",
    title_ar: "الحرف الثالث - التاء (ت)",
    content_json: {
      exercises: [
        {
          id: "ex-3-1",
          type: "mcq",
          question: "Identify the letter Ta (ت)",
          question_ar: "حدد الحرف التاء (ت)",
          options: ["أ", "ب", "ت", "ث"],
          options_ar: ["أ", "ب", "ت", "ث"],
          correct_answer: "ت",
          correct_answer_ar: "ت",
        },
        {
          id: "ex-3-2",
          type: "sorting",
          question: "Sort: ت، أ، ب",
          question_ar: "رتب: ت، أ، ب",
          correct_answer: "أ، ب، ت",
          correct_answer_ar: "أ، ب، ت",
        },
      ],
    },
    order_index: 3,
    created_at: new Date("2026-01-01"),
  },
  {
    id: "lesson-1-4",
    level_index: 1,
    title: "Letter Tha (ث)",
    title_ar: "الحرف الرابع - الثاء (ث)",
    content_json: {
      exercises: [
        {
          id: "ex-4-1",
          type: "mcq",
          question: "Identify the letter Tha (ث)",
          question_ar: "حدد الحرف الثاء (ث)",
          options: ["أ", "ب", "ت", "ث"],
          options_ar: ["أ", "ب", "ت", "ث"],
          correct_answer: "ث",
          correct_answer_ar: "ث",
        },
      ],
    },
    order_index: 4,
    created_at: new Date("2026-01-01"),
  },
  {
    id: "lesson-1-5",
    level_index: 1,
    title: "Letter Jim (ج)",
    title_ar: "الحرف الخامس - الجيم (ج)",
    content_json: {
      exercises: [
        {
          id: "ex-5-1",
          type: "mcq",
          question: "Identify the letter Jim (ج)",
          question_ar: "حدد الحرف الجيم (ج)",
          options: ["ج", "ح", "خ", "ث"],
          options_ar: ["ج", "ح", "خ", "ث"],
          correct_answer: "ج",
          correct_answer_ar: "ج",
        },
      ],
    },
    order_index: 5,
    created_at: new Date("2026-01-01"),
  },
  {
    id: "lesson-1-6",
    level_index: 1,
    title: "Letter Ha (ح)",
    title_ar: "الحرف السادس - الحاء (ح)",
    content_json: {
      exercises: [
        {
          id: "ex-6-1",
          type: "mcq",
          question: "Identify the letter Ha (ح)",
          question_ar: "حدد الحرف الحاء (ح)",
          options: ["ج", "ح", "خ", "ث"],
          options_ar: ["ج", "ح", "خ", "ث"],
          correct_answer: "ح",
          correct_answer_ar: "ح",
        },
      ],
    },
    order_index: 6,
    created_at: new Date("2026-01-01"),
  },
  // Level 2: Harakat (Short Vowels)
  {
    id: "lesson-2-1",
    level_index: 2,
    title: "Fatha (َ)",
    title_ar: "الفتحة (َ)",
    content_json: {
      exercises: [
        {
          id: "ex-2-1-1",
          type: "mcq",
          question: "What is the Fatha vowel?",
          question_ar: "ما هي علامة الفتحة؟",
          options: ["َ", "ُ", "ِ", "ْ"],
          options_ar: ["َ", "ُ", "ِ", "ْ"],
          correct_answer: "َ",
          correct_answer_ar: "َ",
        },
      ],
    },
    order_index: 1,
    created_at: new Date("2026-01-01"),
  },
  {
    id: "lesson-2-2",
    level_index: 2,
    title: "Damma (ُ)",
    title_ar: "الضمة (ُ)",
    content_json: {
      exercises: [
        {
          id: "ex-2-2-1",
          type: "mcq",
          question: "What is the Damma vowel?",
          question_ar: "ما هي علامة الضمة؟",
          options: ["َ", "ُ", "ِ", "ْ"],
          options_ar: ["َ", "ُ", "ِ", "ْ"],
          correct_answer: "ُ",
          correct_answer_ar: "ُ",
        },
      ],
    },
    order_index: 2,
    created_at: new Date("2026-01-01"),
  },
];

// Mock progress
export const mockProgress: StudentProgress[] = [
  {
    id: "progress-1",
    student_id: "student-1",
    lesson_id: "lesson-1-1",
    score: 90,
    completed_at: new Date("2026-02-01"),
  },
  {
    id: "progress-2",
    student_id: "student-1",
    lesson_id: "lesson-1-2",
    score: 85,
    completed_at: new Date("2026-02-02"),
  },
];

// Mock student stats (gamification)
export const mockStudentStats: Record<string, StudentStats> = {
  "student-1": {
    student_id: "student-1",
    streak_days: 3,
    last_activity_date: "2026-05-08",
    achievements: ["first-lesson", "first-letter", "xp-100", "jasmine-explorer"],
    level_title: "متميز",
    level_title_ar: "متميز",
    skills: [
      { category: "Alphabet", category_ar: "الأبجدية", score: 95 },
      { category: "Vocabulary", category_ar: "المفردات", score: 70 },
      { category: "Grammar", category_ar: "القواعد", score: 45 },
      { category: "Pronunciation", category_ar: "النطق", score: 80 },
    ],
    weekly_activity: [
      { day: "Sun", day_ar: "أحد", xp: 50 },
      { day: "Mon", day_ar: "اثنين", xp: 120 },
      { day: "Tue", day_ar: "ثلاثاء", xp: 0 },
      { day: "Wed", day_ar: "أربعاء", xp: 200 },
      { day: "Thu", day_ar: "خميس", xp: 80 },
      { day: "Fri", day_ar: "جمعة", xp: 150 },
      { day: "Sat", day_ar: "سبت", xp: 90 },
    ],
    discovered_cities: ["damascus", "aleppo"],
  },
  "student-2": {
    student_id: "student-2",
    streak_days: 0,
    last_activity_date: null,
    achievements: [],
    level_title: "مبتدئ",
    level_title_ar: "مبتدئ",
    skills: [
      { category: "Alphabet", category_ar: "الأبجدية", score: 20 },
      { category: "Vocabulary", category_ar: "المفردات", score: 10 },
      { category: "Grammar", category_ar: "القواعد", score: 5 },
      { category: "Pronunciation", category_ar: "النطق", score: 15 },
    ],
    weekly_activity: [
      { day: "Sun", day_ar: "أحد", xp: 0 },
      { day: "Mon", day_ar: "اثنين", xp: 0 },
      { day: "Tue", day_ar: "ثلاثاء", xp: 0 },
      { day: "Wed", day_ar: "أربعاء", xp: 0 },
      { day: "Thu", day_ar: "خميس", xp: 20 },
      { day: "Fri", day_ar: "جمعة", xp: 0 },
      { day: "Sat", day_ar: "سبت", xp: 0 },
    ],
    discovered_cities: [],
  },
};

export const getStudentStats = (studentId: string): StudentStats => {
  return mockStudentStats[studentId] || {
    student_id: studentId,
    streak_days: 0,
    last_activity_date: null,
    achievements: [],
    level_title: "مبتدئ",
    level_title_ar: "مبتدئ",
    skills: [],
    weekly_activity: [],
    discovered_cities: [],
  };
};
