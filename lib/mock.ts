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
