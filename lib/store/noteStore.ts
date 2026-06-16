import { create } from "zustand";
import type { NewNote, Note } from "../../types/note";
import { persist } from "zustand/middleware";

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface storeDraft {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

export const useStore = create<storeDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notesDraft",
      partialize: (storeDraft) => ({ draft: storeDraft.draft }),
    },
  ),
);
