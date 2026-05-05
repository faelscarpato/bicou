import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bico, BicoStatus } from "./types";
import { bicosIniciais } from "./mockData";

interface State {
  bicos: Bico[];
  favoritos: string[];
  addBico: (b: Bico) => void;
  updateBico: (id: string, patch: Partial<Bico>) => void;
  setStatus: (id: string, s: BicoStatus) => void;
  toggleFavorito: (id: string) => void;
  reset: () => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      bicos: bicosIniciais,
      favoritos: [],
      addBico: (b) => set((s) => ({ bicos: [b, ...s.bicos] })),
      updateBico: (id, patch) =>
        set((s) => ({ bicos: s.bicos.map((b) => (b.id === id ? { ...b, ...patch } : b)) })),
      setStatus: (id, status) =>
        set((s) => ({ bicos: s.bicos.map((b) => (b.id === id ? { ...b, status } : b)) })),
      toggleFavorito: (id) =>
        set((s) => ({
          favoritos: s.favoritos.includes(id) ? s.favoritos.filter((x) => x !== id) : [...s.favoritos, id],
        })),
      reset: () => set({ bicos: bicosIniciais, favoritos: [] }),
    }),
    { name: "bicou-store" }
  )
);
