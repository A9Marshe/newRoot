# Project RootBridge: MVP Specification Documentation

**Version:** Phase 1 — Frontend-Only MVP  
**Date:** May 8, 2026  
**Status:** Active — Implementation Ready

---

## 1. Project Idea & Objective

### 1.1 Original Goal
RootBridge is a gamified EdTech platform designed for diaspora children (ages 6–12) to learn Arabic and transition smoothly into local educational systems in Arabic-speaking regions.

### 1.2 Target Audience
- **Primary:** Diaspora children aged 6–12 who are native-level or beginner in Arabic
- **Secondary:** Parents (diaspora families) who want to maintain their children's Arabic language skills
- **Tertiary:** Administrators managing content and monitoring progress

### 1.3 Core Value Proposition
- **Bridge the gap:** Help diaspora children maintain and improve Arabic literacy
- **Gamified learning:** XP, levels, celebrations, and progress tracking to keep children engaged
- **Parent involvement:** Dashboard for parents to monitor their children's progress
- **Cultural relevance:** Content tailored to Syrian diaspora context with appropriate dialect considerations
- **Smooth transitions:** Prepare children for reintegration into local Arabic-speaking school systems

---

## 2. Phase 1 Scope

Phase 1 is a **frontend-only implementation** using mock data. No backend services will be integrated in this phase.

### 2.1 In-Scope (Phase 1)

| Category | Items |
| --- | --- |
| **Frontend Routes** | `/`, `/login`, `/dashboard`, `/learn`, `/lesson/[id]`, `/placement` |
| **UI Components** | All pages built with shadcn/ui component library |
| **Mock Data** | Static/mock datasets for students, lessons, progress, and parent profile |
| **Locale** | `arabic-sy` (Arabic, Syria variant) with `lang="ar-SY"` and `dir="rtl"` |
| **Typography** | Tajawal and/or Cairo Arabic fonts loaded via Next.js font system |
| **RTL Layout** | Full right-to-left layout support across all pages |
| **Localization** | Arabic strings (Syrian dialect where appropriate) for all UI text |
| **Animations** | Framer Motion for kid-friendly transitions and celebrations |
| **Gamification** | XP system, confetti celebrations, locked/unlocked level nodes |
| **State Management** | TanStack Query for mock data fetching and client-side state |
| **Progress Display** | Visual progress charts and indicators (mock data only) |

### 2.2 Out-of-Scope (Phase 1)

| Category | Items |
| --- | --- |
| **Backend** | No Supabase integration, no PostgreSQL database |
| **Authentication** | No real auth — login page will be a mock UI only |
| **AI Features** | No OpenAI API integration or "Helping Hand" AI modal |
| **Persistence** | No real progress saving — all progress is session-based mock data |
| **RLS Policies** | No Row Level Security (no Supabase) |
| **Real Deploy** | Deployment is out-of-scope for Phase 1 (local dev only) |

---

## 3. Adjusted Tech Stack (Phase 1)

### 3.1 Included Technologies

| Technology | Version | Purpose |
| --- | --- | --- |
| **Next.js** | 14+ (App Router) | React framework with file-based routing |
| **Tailwind CSS** | v4 | Utility-first styling framework |
| **shadcn/ui** | Latest | Accessible UI component library (Radix UI primitives) |
| **TanStack Query** | v5 | Data fetching and client-state management for mock data |
| **Framer Motion** | Latest | Animations and transitions for kid-friendly UX |
| **Tajawal Font** | Google Fonts | Primary Arabic font (high legibility) |
| **Cairo Font** | Google Fonts | Secondary Arabic font option |
| **next-intl** | Latest | Internationalization (locale switching, Arabic-Syrian strings) |
| **TypeScript** | 5+ | Type safety across the codebase |

### 3.2 Excluded Technologies (Phase 1)

| Technology | Reason for Exclusion |
| --- | --- |
| **Supabase** | No backend in Phase 1 — all data is mocked |
| **OpenAI API** | AI features deferred to Phase 2+ |
| **PostgreSQL** | No database in Phase 1 |
| **Edge Functions** | No backend in Phase 1 |

---

## 4. Updated Routing & Component Map

All routes use `lang="ar-SY"` and `dir="rtl"` on the document root. All data is fetched from mock files or TanStack Query mock hooks.

| Route | Page Name | Primary Components | Data Source |
| --- | --- | --- | --- |
| `/` | Landing Page | Hero Section, Value Prop, CTA Button, RTL Layout | Mock strings |
| `/login` | Auth (Mock) | shadcn/ui Auth Forms, Arabic labels | Mock only (no real auth) |
| `/dashboard` | Parent Portal | Student Switcher, Progress Charts, Add-Child Modal (UI only) | Mock students + progress |
| `/learn` | Learning Path | Gamified Map, Level Nodes (Locked/Unlocked), XP Display | Mock lessons + progress |
| `/lesson/[id]` | Classroom | Exercise Engine (MCQ, Word Sort), Progress Bar, Mock AI Button | Mock lesson content |
| `/placement` | Assessment | Dynamic Quiz Component, Score Display | Mock placement questions |

### 4.1 Component Hierarchy (Planned)

```
app/
├── layout.tsx              # Root layout: RTL, lang="ar-SY", fonts, next-intl provider
├── page.tsx                # Landing page
├── login/
│   └── page.tsx            # Mock auth form
├── dashboard/
│   └── page.tsx            # Parent dashboard
├── learn/
│   └── page.tsx            # Learning map
├── lesson/
│   └── [id]/
│       └── page.tsx        # Lesson classroom
└── placement/
    └── page.tsx            # Placement test
```

---

## 5. UI/UX Guidelines

### 5.1 Core Principles for Children

1. **High Contrast:** Large, legible Arabic fonts (Tajawal or Cairo at 18px+ for body text)
2. **Safety & Simplicity:** Minimal text for children; use icons and audio cues where possible
3. **Positive Reinforcement:** Immediate XP gains and visual celebrations (confetti on correct answers)
4. **Calm Palette:** Soft blues (`#4A90D9`), greens (`#7ED321`), and yellows (`#F5A623`) to prevent overstimulation
5. **Large Touch Targets:** Minimum 44px touch targets for tablet/phone usability

### 5.2 Arabic-Syrian (ar-SY) Specifics

| Guideline | Implementation |
| --- | --- |
| **Document Direction** | `dir="rtl"` on `<html>` tag, `lang="ar-SY"` attribute |
| **Font Loading** | Next.js `next/font/google` for Tajawal and Cairo (Arabic subset) |
| **Text Rendering** | Proper Arabic ligature support via font settings |
| **Cultural References** | Use Syrian diaspora context in examples (Damascus, Aleppo, etc.) |
| **Dialect** | Syrian dialect for conversational Arabic, MSA for formal lessons |
| **Number Formatting** | Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩) where appropriate |
| **Date Formatting** | DD/MM/YYYY with Arabic month names |

### 5.3 Color Palette

```css
:root {
  --color-primary: #4A90D9;    /* Soft Blue */
  --color-success: #7ED321;    /* Green */
  --color-warning: #F5A623;    /* Yellow/Orange */
  --color-background: #FFFFFF;  /* White */
  --color-text: #333333;       /* Dark Gray */
  --color-muted: #9B9B9B;      /* Medium Gray */
}
```

---

## 6. Mock Data Definitions

### 6.1 TypeScript Types

```typescript
// ==========================================
// Profile (Parent)
// ==========================================
interface MockProfile {
  id: string;
  display_name: string;
  email: string;
  role: 'parent' | 'admin';
  created_at: string;
}

// ==========================================
// Student
// ==========================================
interface MockStudent {
  id: string;
  parent_id: string;
  name: string;          // Arabic name
  age: number;
  current_level: number;  // 0: Placement, 1: Letters, etc.
  total_xp: number;
  avatar_url: string | null;
  created_at: string;
}

// ==========================================
// Lesson
// ==========================================
interface MockLesson {
  id: string;
  level_index: number;
  title: string;         // Arabic title
  content_json: {
    exercises: MockExercise[];
    instructions: string; // Arabic instructions
  };
  order_index: number;
  created_at: string;
}

// ==========================================
// Exercise Types
// ==========================================
type ExerciseType = 'mcq' | 'word_sort' | 'fill_blank';

interface MockExercise {
  id: string;
  type: ExerciseType;
  question: string;      // Arabic question
  options?: string[];    // For MCQ (Arabic options)
  correct_answer: string | string[];
  explanation?: string;  // Arabic explanation
}

// ==========================================
// Student Progress
// ==========================================
interface MockStudentProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  score: number;         // 0-100
  completed_at: string | null; // null if not completed
}

// ==========================================
// Learning Level (for map UI)
// ==========================================
interface MockLevel {
  index: number;
  title: string;         // Arabic title
  description: string;   // Arabic description
  is_locked: boolean;
  lessons: MockLesson[];
  required_xp: number;
}
```

### 6.2 Example Mock Data

#### Mock Parent Profile
```typescript
const mockProfile: MockProfile = {
  id: 'parent-001',
  display_name: 'أحمد محمد',
  email: 'ahmad@example.com',
  role: 'parent',
  created_at: '2026-05-01T10:00:00Z',
};
```

#### Mock Students (2-3 Examples)
```typescript
const mockStudents: MockStudent[] = [
  {
    id: 'student-001',
    parent_id: 'parent-001',
    name: 'ياسين أحمد',
    age: 8,
    current_level: 1,
    total_xp: 350,
    avatar_url: null,
    created_at: '2026-05-02T10:00:00Z',
  },
  {
    id: 'student-002',
    parent_id: 'parent-001',
    name: 'سارة أحمد',
    age: 6,
    current_level: 0, // Needs placement test
    total_xp: 50,
    avatar_url: null,
    created_at: '2026-05-03T10:00:00Z',
  },
  {
    id: 'student-003',
    parent_id: 'parent-001',
    name: 'عمر أحمد',
    age: 10,
    current_level: 2,
    total_xp: 1200,
    avatar_url: null,
    created_at: '2026-05-04T10:00:00Z',
  },
];
```

#### Mock Lessons (Placement + Level 1: Letters)
```typescript
const mockLessons: MockLesson[] = [
  // ===== Placement Test (level_index: 0) =====
  {
    id: 'lesson-placement-001',
    level_index: 0,
    title: 'اختبار تحديد المستوى - الجزء الأول',
    content_json: {
      instructions: 'اختر الحرف الصحيح من الخيارات التالية',
      exercises: [
        {
          id: 'ex-001',
          type: 'mcq',
          question: 'ما هو هذا الحرف؟ (أ)',
          options: ['أ', 'ب', 'ت', 'ث'],
          correct_answer: 'أ',
          explanation: 'هذا هو حرف الألف',
        },
        {
          id: 'ex-002',
          type: 'mcq',
          question: 'ما هو هذا الحرف؟ (ب)',
          options: ['أ', 'ب', 'ت', 'ث'],
          correct_answer: 'ب',
          explanation: 'هذا هو حرف الباء',
        },
        {
          id: 'ex-003',
          type: 'word_sort',
          question: 'رتب الحروف لتكوين كلمة (ت - س - ل)',
          correct_answer: ['س', 'ل', 'ت'],
          explanation: 'الكلمة هي "سلت"',
        },
      ],
    },
    order_index: 1,
    created_at: '2026-05-01T10:00:00Z',
  },

  // ===== Level 1: Letters (level_index: 1) =====
  {
    id: 'lesson-l1-001',
    level_index: 1,
    title: 'الحرف الأول: الألف (ا)',
    content_json: {
      instructions: 'تعلم حرف الألف وصوته',
      exercises: [
        {
          id: 'ex-l1-001',
          type: 'mcq',
          question: 'أي كلمة تبدأ بحرف الألف؟',
          options: ['أسد', 'بطة', 'تفاح', 'ثعلب'],
          correct_answer: 'أسد',
          explanation: 'كلمة "أسد" تبدأ بحرف الألف',
        },
        {
          id: 'ex-l1-002',
          type: 'mcq',
          question: 'ما هو شكل حرف الألف؟',
          options: ['ا', 'ب', 'ت', 'ث'],
          correct_answer: 'ا',
          explanation: 'حرف الألف يكتب هكذا: ا',
        },
      ],
    },
    order_index: 1,
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'lesson-l1-002',
    level_index: 1,
    title: 'الحرف الثاني: الباء (ب)',
    content_json: {
      instructions: 'تعلم حرف الباء وصوته',
      exercises: [
        {
          id: 'ex-l1-003',
          type: 'mcq',
          question: 'أي كلمة تبدأ بحرف الباء؟',
          options: ['أسد', 'بطة', 'تفاح', 'ثعلب'],
          correct_answer: 'بطة',
          explanation: 'كلمة "بطة" تبدأ بحرف الباء',
        },
        {
          id: 'ex-l1-004',
          type: 'word_sort',
          question: 'رتب الحروف لتكوين كلمة (ب - ط - ة)',
          correct_answer: ['ب', 'ط', 'ة'],
          explanation: 'الكلمة هي "بطة"',
        },
      ],
    },
    order_index: 2,
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'lesson-l1-003',
    level_index: 1,
    title: 'الحرف الثالث: التاء (ت)',
    content_json: {
      instructions: 'تعلم حرف التاء وصوته',
      exercises: [
        {
          id: 'ex-l1-005',
          type: 'mcq',
          question: 'أي كلمة تبدأ بحرف التاء؟',
          options: ['أسد', 'بطة', 'تفاح', 'ثعلب'],
          correct_answer: 'تفاح',
          explanation: 'كلمة "تفاح" تبدأ بحرف التاء',
        },
        {
          id: 'ex-l1-006',
          type: 'fill_blank',
          question: 'اكمل الكلمة: ت_ _ اح',
          correct_answer: 'ف',
          explanation: 'الكلمة هي "تفاح"',
        },
      ],
    },
    order_index: 3,
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'lesson-l1-004',
    level_index: 1,
    title: 'مراجعة: الأحرف الثلاثة الأولى',
    content_json: {
      instructions: 'اختبر ما تعلمته عن الألف والباء والتاء',
      exercises: [
        {
          id: 'ex-l1-007',
          type: 'word_sort',
          question: 'رتب الحروف لتكوين كلمة (ت - ب - ا)',
          correct_answer: ['ت', 'ب', 'ا'],
          explanation: 'الكلمة هي "تبأ" (لعبة ترتيب)',
        },
        {
          id: 'ex-l1-008',
          type: 'mcq',
          question: 'ما هو الحرف الأول في كلمة "تفاح"؟',
          options: ['أ', 'ب', 'ت', 'ث'],
          correct_answer: 'ت',
          explanation: 'كلمة "تفاح" تبدأ بحرف التاء',
        },
      ],
    },
    order_index: 4,
    created_at: '2026-05-01T10:00:00Z',
  },
];
```

#### Mock Student Progress
```typescript
const mockProgress: MockStudentProgress[] = [
  // Yasen (student-001) completed placement and first 2 lessons
  {
    id: 'prog-001',
    student_id: 'student-001',
    lesson_id: 'lesson-placement-001',
    score: 100,
    completed_at: '2026-05-05T14:00:00Z',
  },
  {
    id: 'prog-002',
    student_id: 'student-001',
    lesson_id: 'lesson-l1-001',
    score: 90,
    completed_at: '2026-05-06T10:00:00Z',
  },
  {
    id: 'prog-003',
    student_id: 'student-001',
    lesson_id: 'lesson-l1-002',
    score: 85,
    completed_at: '2026-05-06T11:30:00Z',
  },

  // Sarah (student-002) only completed placement
  {
    id: 'prog-004',
    student_id: 'student-002',
    lesson_id: 'lesson-placement-001',
    score: 60,
    completed_at: '2026-05-07T09:00:00Z',
  },

  // Omar (student-003) completed placement and all Level 1 lessons
  {
    id: 'prog-005',
    student_id: 'student-003',
    lesson_id: 'lesson-placement-001',
    score: 100,
    completed_at: '2026-05-04T15:00:00Z',
  },
  {
    id: 'prog-006',
    student_id: 'student-003',
    lesson_id: 'lesson-l1-001',
    score: 95,
    completed_at: '2026-05-05T10:00:00Z',
  },
  {
    id: 'prog-007',
    student_id: 'student-003',
    lesson_id: 'lesson-l1-002',
    score: 100,
    completed_at: '2026-05-05T11:00:00Z',
  },
  {
    id: 'prog-008',
    student_id: 'student-003',
    lesson_id: 'lesson-l1-003',
    score: 90,
    completed_at: '2026-05-05T12:00:00Z',
  },
  {
    id: 'prog-009',
    student_id: 'student-003',
    lesson_id: 'lesson-l1-004',
    score: 95,
    completed_at: '2026-05-05T13:00:00Z',
  },
];
```

#### Mock Learning Levels (for Map UI)
```typescript
const mockLevels: MockLevel[] = [
  {
    index: 0,
    title: 'اختبار تحديد المستوى',
    description: 'اختبار لتحديد مستوى الطفل في اللغة العربية',
    is_locked: false,
    lessons: [mockLessons[0]], // Placement lesson
    required_xp: 0,
  },
  {
    index: 1,
    title: 'المستوى الأول: الحروف',
    description: 'تعلم الحروف العربية الأولى (الألف، الباء، التاء)',
    is_locked: false,
    lessons: mockLessons.slice(1), // Level 1 lessons
    required_xp: 100,
  },
  {
    index: 2,
    title: 'المستوى الثاني: الكلمات البسيطة',
    description: 'تكوين كلمات بسيطة من الحروف المكتسبة',
    is_locked: true,
    lessons: [], // To be populated in Phase 2
    required_xp: 500,
  },
  {
    index: 3,
    title: 'المستوى الثالث: الجمل القصيرة',
    description: 'تكوين جمل قصيرة وبسيطة',
    is_locked: true,
    lessons: [], // To be populated in Phase 2
    required_xp: 1200,
  },
];
```

### 6.3 Mock Data File Structure

```
mock/
├── profile.ts          # MockProfile
├── students.ts         # MockStudent[]
├── lessons.ts          # MockLesson[] (placement + Level 1)
├── progress.ts         # MockStudentProgress[]
├── levels.ts           # MockLevel[]
└── index.ts            # Barrel exports
```

---

## 7. Reference: Codebase Audit Results

### 7.1 Current State (as of May 8, 2026)

| Metric | Status |
| --- | --- |
| **Project Type** | Bare Next.js 16.2.6 + Tailwind v4 starter |
| **Root Route (`/`)** | Exists with default Next.js starter content |
| **RootBridge Features** | None implemented |
| **shadcn/ui** | Not installed |
| **Supabase** | Not configured |
| **TanStack Query** | Not installed |
| **Framer Motion** | Not installed |
| **OpenAI** | Not integrated |
| **Arabic Fonts** | Not loaded |
| **RTL Support** | Not implemented |
| **Mock Data** | Not created |
| **Estimated Completion** | ~5% (base framework only) |

### 7.2 Features to Build from Scratch

1. **Project Setup:**
   - Install and configure shadcn/ui
   - Install TanStack Query, Framer Motion
   - Load Tajawal and Cairo Arabic fonts
   - Configure `next-intl` for `ar-SY` locale
   - Set up RTL layout in root layout

2. **Mock Data Layer:**
   - Create `mock/` directory with all data files
   - Define TypeScript types/interfaces
   - Create TanStack Query mock hooks (or static imports)

3. **Pages (All from Scratch):**
   - Landing page (`/`) with RTL + Arabic content
   - Login page (`/login`) with mock form
   - Dashboard (`/dashboard`) with student switcher and progress
   - Learning map (`/learn`) with gamified level nodes
   - Lesson classroom (`/lesson/[id]`) with exercise engine
   - Placement test (`/placement`) with quiz component

4. **Components (All from Scratch):**
   - Student switcher dropdown
   - Progress charts (using recharts or similar)
   - Gamified learning map with locked/unlocked nodes
   - Exercise engine (MCQ, word sort, fill-blank)
   - XP display and confetti celebration
   - Arabic-friendly UI components via shadcn/ui

5. **Styling & UX:**
   - Apply Arabic-Syrian locale strings throughout
   - Implement RTL layout on all pages
   - Add Framer Motion animations for transitions
   - Ensure high-contrast, kid-friendly design

---

## 8. Next Steps (Phase 1 Implementation Order)

1. **Project Initialization:** Install dependencies (shadcn/ui, TanStack Query, Framer Motion, next-intl)
2. **Fonts & RTL:** Configure Tajawal/Cairo fonts, set `lang="ar-SY"` and `dir="rtl"`
3. **Mock Data:** Create all mock data files and TypeScript types
4. **Landing Page:** Build RTL Arabic landing page with hero and CTA
5. **Login Page:** Build mock auth form with Arabic labels
6. **Dashboard:** Build parent portal with student switcher and progress
7. **Learning Map:** Build gamified map with level nodes
8. **Lesson Engine:** Build classroom with exercise types (MCQ, word sort)
9. **Placement Test:** Build dynamic quiz component
10. **Polish:** Add animations, confetti, and verify RTL throughout

---

*End of Specification Document*
