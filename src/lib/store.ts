import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BicosFiltersState, DEFAULT_BICOS_FILTERS } from "./bicoFilters";
import { Bico, BicoStatus, SaqueDemo } from "./types";
import { bicosIniciais } from "./mockData";

interface State {
  bicos: Bico[];
  favoritos: string[];
  saldoCarteiraDemo: number;
  saques: SaqueDemo[];
  legacyGptMigrated: boolean;
  prestadorBicosFiltros: BicosFiltersState;
  addBico: (b: Bico) => void;
  updateBico: (id: string, patch: Partial<Bico>) => void;
  setStatus: (id: string, s: BicoStatus) => void;
  toggleFavorito: (id: string) => void;
  setPrestadorBicosFiltros: (patch: Partial<BicosFiltersState>) => void;
  resetPrestadorBicosFiltros: () => void;
  registrarSaque: (valor: number) => void;
  importLegacyBicos: (bicos: Bico[]) => void;
  markLegacyGptMigrated: () => void;
  reset: () => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      bicos: bicosIniciais,
      favoritos: [],
      saldoCarteiraDemo: 420,
      saques: [],
      legacyGptMigrated: false,
      prestadorBicosFiltros: DEFAULT_BICOS_FILTERS,
      addBico: (b) => set((s) => ({ bicos: [b, ...s.bicos] })),
      updateBico: (id, patch) =>
        set((s) => ({ bicos: s.bicos.map((b) => (b.id === id ? { ...b, ...patch } : b)) })),
      setStatus: (id, status) =>
        set((s) => ({ bicos: s.bicos.map((b) => (b.id === id ? { ...b, status } : b)) })),
      toggleFavorito: (id) =>
        set((s) => ({
          favoritos: s.favoritos.includes(id) ? s.favoritos.filter((x) => x !== id) : [...s.favoritos, id],
        })),
      setPrestadorBicosFiltros: (patch) =>
        set((s) => ({ prestadorBicosFiltros: { ...s.prestadorBicosFiltros, ...patch } })),
      resetPrestadorBicosFiltros: () => set({ prestadorBicosFiltros: DEFAULT_BICOS_FILTERS }),
      registrarSaque: (valor) =>
        set((s) => {
          if (valor <= 0) return {};
          return {
            saques: [
              {
                id: `saque-${Date.now()}`,
                valor,
                criadoEm: new Date().toLocaleString("pt-BR"),
                status: "simulado",
              },
              ...s.saques,
            ],
          };
        }),
      importLegacyBicos: (novos) =>
        set((s) => {
          const idsAtuais = new Set(s.bicos.map((b) => b.id));
          const unicos = novos.filter((b) => !idsAtuais.has(b.id));
          return { bicos: [...unicos, ...s.bicos], legacyGptMigrated: true };
        }),
      markLegacyGptMigrated: () => set({ legacyGptMigrated: true }),
      reset: () => set({ bicos: bicosIniciais, favoritos: [], saques: [] }),
    }),
    { name: "bicou-store" }
  )
);
