import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WrongItem = {
  id: string;
  lessonSlug: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
  wrongChoice: number;
  at: number;
};

type ProgressState = {
  completed: string[];
  quizScores: Record<string, number>;
  bookmarks: string[];
  notes: Record<string, string>;
  wrongBook: WrongItem[];
  /** YYYY-MM-DD check-in dates */
  checkIns: string[];
  streak: number;
  studioDone: string[];
  markComplete: (slug: string) => void;
  setQuizScore: (slug: string, score: number) => void;
  toggleBookmark: (slug: string) => void;
  setNote: (slug: string, text: string) => void;
  addWrong: (item: Omit<WrongItem, "at">) => void;
  clearWrong: (id: string) => void;
  clearAllWrong: () => void;
  checkInToday: () => void;
  markStudio: (id: string) => void;
  reset: () => void;
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function computeStreak(checkIns: string[]): number {
  if (checkIns.length === 0) return 0;
  const set = new Set(checkIns);
  let streak = 0;
  const cursor = new Date();
  if (!set.has(todayKey())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  for (;;) {
    const y = cursor.getFullYear();
    const m = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${day}`;
    if (!set.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: [],
      quizScores: {},
      bookmarks: [],
      notes: {},
      wrongBook: [],
      checkIns: [],
      streak: 0,
      studioDone: [],
      markComplete: (slug) =>
        set((s) =>
          s.completed.includes(slug)
            ? s
            : { completed: [...s.completed, slug] },
        ),
      setQuizScore: (slug, score) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [slug]: score },
        })),
      toggleBookmark: (slug) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(slug)
            ? s.bookmarks.filter((b) => b !== slug)
            : [...s.bookmarks, slug],
        })),
      setNote: (slug, text) =>
        set((s) => ({
          notes: { ...s.notes, [slug]: text },
        })),
      addWrong: (item) =>
        set((s) => {
          const filtered = s.wrongBook.filter((w) => w.id !== item.id);
          return {
            wrongBook: [{ ...item, at: Date.now() }, ...filtered].slice(0, 80),
          };
        }),
      clearWrong: (id) =>
        set((s) => ({
          wrongBook: s.wrongBook.filter((w) => w.id !== id),
        })),
      clearAllWrong: () => set({ wrongBook: [] }),
      checkInToday: () => {
        const key = todayKey();
        const { checkIns } = get();
        if (checkIns.includes(key)) {
          set({ streak: computeStreak(checkIns) });
          return;
        }
        const next = [...checkIns, key];
        set({ checkIns: next, streak: computeStreak(next) });
      },
      markStudio: (id) =>
        set((s) =>
          s.studioDone.includes(id)
            ? s
            : { studioDone: [...s.studioDone, id] },
        ),
      reset: () =>
        set({
          completed: [],
          quizScores: {},
          bookmarks: [],
          notes: {},
          wrongBook: [],
          checkIns: [],
          streak: 0,
          studioDone: [],
        }),
    }),
    {
      name: "lottie-learn-progress-v1",
      version: 1,
      migrate: (persisted) => {
        const p = (persisted ?? {}) as Partial<ProgressState>;
        return {
          completed: p.completed ?? [],
          quizScores: p.quizScores ?? {},
          bookmarks: p.bookmarks ?? [],
          notes: p.notes ?? {},
          wrongBook: p.wrongBook ?? [],
          checkIns: p.checkIns ?? [],
          streak: p.streak ?? 0,
          studioDone: p.studioDone ?? [],
        };
      },
    },
  ),
);

export { todayKey, computeStreak };
